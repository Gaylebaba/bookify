import Booking from "../models/booking.js";

export const processPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message: "Booking already processed",
      });
    }

    // Fake payment success
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