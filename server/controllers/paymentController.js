import Booking from "../models/booking.js";

export const processPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // 🔐 Only booking owner can pay
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to pay for this booking",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message: "Booking already processed",
      });
    }

    // 💰 Commission calculation (3% for now)
    const commissionRate = 0.03;
    booking.commission = booking.amount * commissionRate;

    booking.status = "confirmed";

    await booking.save();

    res.status(200).json({
      message: "Payment successful",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};