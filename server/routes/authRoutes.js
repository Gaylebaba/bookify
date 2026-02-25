import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { getAllUsers, toggleBlockUser } from "../controllers/userController.js";
import UserHistory from "./pages/user/UserHistory";

import {
  addVenue,
  getOwnerVenues,
  getApprovedVenues,
  getVenueById,
  approveVenue,
  updateVenue
} from "../controllers/venueController.js";
import {
  addReview,
  getVenueReviews
} from "../controllers/Reviewcontroller.js";

import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  getOwnerAnalytics,
  blockSlot
} from "../controllers/bookingController.js";

import { processPayment } from "../controllers/paymentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ================= */

router.post("/register", registerUser);
router.post("/login", loginUser);

/* ================= VENUES ================= */

// Owner add venue
router.post("/venue", protect, authorize("owner"), addVenue);

// Owner get his venues
router.get("/owner/venues", protect, authorize("owner"), getOwnerVenues);

// Get all approved venues (public)
router.get("/venues", getApprovedVenues);

// Get single venue
router.get("/venues/:id", getVenueById);

// Owner update venue
router.put("/venues/:id", protect, authorize("owner"), updateVenue);

// Admin approve venue
router.put("/admin/approve/:id", protect, authorize("admin"), approveVenue);


/* ================= BOOKINGS ================= */

// User create booking
router.post("/booking", protect, authorize("enduser"), createBooking);

// User booking history
router.get("/user/bookings", protect, authorize("enduser"), getUserBookings);

// Admin view all bookings
router.get("/admin/bookings", protect, authorize("admin"), getAllBookings);

// Cancel booking
router.put("/booking/cancel/:id", protect, authorize("enduser"), cancelBooking);

// Owner block slot
router.post("/owner/block-slot", protect, authorize("owner"), blockSlot);

// Owner analytics
router.get("/owner/analytics", protect, authorize("owner"), getOwnerAnalytics);


/* ================= PAYMENT ================= */

router.post("/payment", protect, authorize("enduser"), processPayment);


/* ================= ADMIN USERS ================= */

router.get("/admin/users", protect, authorize("admin"), getAllUsers);

router.put(
  "/admin/users/:id",
  protect,
  authorize("admin"),
  toggleBlockUser
);
router.get(
  "/venue/:id/bookings",
  getVenueBookingsByDate
);
/* ===== REVIEWS ===== */

router.post(
  "/review",
  protect,
  authorize("enduser"),
  addReview
);

router.get(
  "/venues/:id/reviews",
  getVenueReviews
);

router.get(
  "/review/status/:venueId",
  protect,
  authorize("enduser"),
  checkReviewStatus
);
<Route path="/user/history" element={<UserHistory />} />

export default router;
