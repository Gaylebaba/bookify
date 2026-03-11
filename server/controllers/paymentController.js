import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Booking from "../models/bookings.js";

/* ================= CREATE ORDER ================= */

export const createOrder = async (req, res) => {
  try {

    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    const options = {
      amount: booking.amount * 100,
      currency: "INR",
      receipt: booking._id.toString()
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


/* ================= VERIFY PAYMENT ================= */

export const verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    const crypto = await import("crypto");

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed"
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    /* ================= CALCULATE COMMISSION ================= */

    const commissionRate = 0.03; // 3%

    booking.commission = booking.amount * commissionRate;

    booking.status = "confirmed";

    await booking.save();

    res.json({
      message: "Payment verified successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};