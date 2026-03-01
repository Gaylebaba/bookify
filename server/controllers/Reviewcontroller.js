import Review from "../models/Review.js";
import Booking from "../models/bookings.js";

/* ===== ADD REVIEW ===== */

export const addReview = async (req, res) => {
  try {
    const { venueId, rating, comment } = req.body;

    if (!venueId || !rating || !comment) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // ✅ Check if user has confirmed booking
    const booking = await Booking.findOne({
      user: req.user._id,
      venue: venueId,
      status: "confirmed",
    });

    if (!booking) {
      return res.status(403).json({
        message: "You can only review after booking and playing",
      });
    }

    // ❌ Prevent duplicate review
    const existing = await Review.findOne({
      user: req.user._id,
      venue: venueId,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already reviewed this venue",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      venue: venueId,
      rating,
      comment,
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* ===== GET VENUE REVIEWS ===== */

export const getVenueReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      venue: req.params.id,
    })
    .populate("user", "name")
    .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* ===== CHECK IF USER REVIEWED ===== */

export const checkReviewStatus = async (req, res) => {
  try {
    const review = await Review.findOne({
      user: req.user._id,
      venue: req.params.venueId,
    });

    if (review) {
      return res.status(200).json({ reviewed: true });
    }

    res.status(200).json({ reviewed: false });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};