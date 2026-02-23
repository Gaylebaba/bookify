import Booking from "../models/booking.js";
import Venue from "../models/venue.js";

/* ================= CREATE BOOKING ================= */
export const createBooking = async (req, res) => {
  try {
    const { venueId, date, startTime, endTime } = req.body;

    if (!venueId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const venue = await Venue.findById(venueId);

    if (!venue || !venue.approved) {
      return res.status(404).json({
        message: "Venue not available",
      });
    }

    // 🔒 Check exact slot conflict (basic version)
    // 🔒 CHECK TIME OVERLAP
const existingBookings = await Booking.find({
  venue: venueId,
  date,
  status: "confirmed",
});

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const newStart = toMinutes(startTime);
const newEnd = toMinutes(endTime);

for (let booking of existingBookings) {
  const existingStart = toMinutes(booking.startTime);
  const existingEnd = toMinutes(booking.endTime);

  const overlap =
    newStart < existingEnd && newEnd > existingStart;

  if (overlap) {
    return res.status(400).json({
      message: "This time slot is already booked",
    });
  }
}

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    const amount = venue.price;

    const booking = await Booking.create({
      user: req.user._id,
      venue: venueId,
      date,
      startTime,
      endTime,
      amount,
      commission: 0,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking created successfully. Proceed to payment.",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



/* ================= USER BOOKINGS ================= */

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("venue", "name sports");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* ================= ADMIN BOOKINGS ================= */

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("venue", "name");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= CANCEL BOOKING ================= */

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= OWNER ANALYTICS ================= */

export const getOwnerAnalytics = async (req, res) => {
  try {
    // Get all venues owned by this owner
    const venues = await Venue.find({ owner: req.user._id });

    const venueIds = venues.map(v => v._id);

    // Get bookings for those venues
    const bookings = await Booking.find({
      venue: { $in: venueIds },
    });

    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(
      b => b.status === "confirmed"
    );

    const cancelledBookings = bookings.filter(
      b => b.status === "cancelled"
    );

    const totalRevenue = confirmedBookings.reduce(
      (sum, b) => sum + b.amount,
      0
    );

    const totalCommission = confirmedBookings.reduce(
      (sum, b) => sum + b.commission,
      0
    );

    const netRevenue = totalRevenue - totalCommission;

    res.status(200).json({
      totalBookings,
      confirmed: confirmedBookings.length,
      cancelled: cancelledBookings.length,
      totalRevenue,
      totalCommission,
      netRevenue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= OWNER BLOCK SLOT ================= */

export const blockSlot = async (req, res) => {
  try {
    const { venueId, date, startTime, endTime } = req.body;

    if (!venueId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    // 🔒 Ensure owner owns this venue
    if (venue.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // 🔒 Check if already booked or blocked
    const existing = await Booking.findOne({
      venue: venueId,
      date,
      startTime,
      endTime,
      status: { $in: ["confirmed", "blocked"] },
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot already booked or blocked",
      });
    }

    const booking = await Booking.create({
      venue: venueId,
      user: req.user._id,
      date,
      startTime,
      endTime,
      amount: 0,
      commission: 0,
      status: "blocked",
    });

    res.status(201).json({
      message: "Slot blocked successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};