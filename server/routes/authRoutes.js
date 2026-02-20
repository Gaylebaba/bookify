import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import {
  addVenue,
  getOwnerVenues,
  getAllVenues,
  approveVenue,
  getApprovedVenues,
  getVenueById
} from "../controllers/venueController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getUserBookings,
  getAllBookings
} from "../controllers/bookingController.js";
import { cancelBooking } from "../controllers/bookingController.js";
import { getOwnerAnalytics } from "../controllers/bookingController.js";



const router = express.Router();

/* =====================================================
   AUTH ROUTES
===================================================== */

router.post("/register", registerUser);
router.post("/login", loginUser);


/* =====================================================
   OWNER ROUTES
===================================================== */

// Add new venue
router.post("/venue/add", protect, authorize("owner"), addVenue);

// Get only owner’s venues
router.get("/venue/my", protect, authorize("owner"), getOwnerVenues);


/* =====================================================
   ADMIN ROUTES
===================================================== */

// Get all venues (admin)
router.get("/venue/all", protect, authorize("admin"), getAllVenues);

// Approve venue
router.put("/venue/approve/:id", protect, authorize("admin"), approveVenue);


/* =====================================================
   USER ROUTES
===================================================== */

// Get all approved venues (public)
router.get("/venues", getApprovedVenues);

// Get single venue details
router.get("/venue/:id", getVenueById);

/* ================= BOOKING ROUTES ================= */

// User creates booking
router.post("/booking/create", protect, authorize("enduser"), createBooking);

// User booking history
router.get("/booking/my", protect, authorize("enduser"), getUserBookings);

// Admin view all bookings
router.get("/booking/all", protect, authorize("admin"), getAllBookings);

router.put(
  "/booking/cancel/:id",
  protect,
  authorize("enduser"),
  cancelBooking
);
router.get(
  "/owner/analytics",
  protect,
  authorize("owner"),
  getOwnerAnalytics
);



export default router;
