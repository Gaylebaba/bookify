import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { getAllUsers, toggleBlockUser } from "../controllers/userController.js";

import {
  addVenue,
  getOwnerVenues,
  getAllVenues,
  getSingleVenue,
  approveVenue,
  updateVenue
} from "../controllers/venueController.js";

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

// Get all approved venues (user side)
router.get("/venues", getAllVenues);

// Get single venue
router.get("/venues/:id", getSingleVenue);

// Owner update venue
router.put("/venues/:id", protect, authorize("owner"), updateVenue);

// Admin approve venue
router.put("/admin/approve/:id", protect, authorize("admin"), approveVenue);


/* ================= BOOKINGS ================= */

// User create booking
router.post("/booking", protect, authorize("user"), createBooking);

// User booking history
router.get("/user/bookings", protect, authorize("user"), getUserBookings);

// Admin view all bookings
router.get("/admin/bookings", protect, authorize("admin"), getAllBookings);

// Cancel booking
router.put("/booking/cancel/:id", protect, authorize("user"), cancelBooking);

// Owner block slot
router.post("/owner/block-slot", protect, authorize("owner"), blockSlot);

// Owner analytics
router.get("/owner/analytics", protect, authorize("owner"), getOwnerAnalytics);


/* ================= PAYMENT ================= */

router.post("/payment", protect, authorize("user"), processPayment);

router.get(
  "/admin/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.get(
  "/admin/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.put(
  "/admin/users/:id",
  protect,
  authorize("admin"),
  toggleBlockUser
);

export default router;