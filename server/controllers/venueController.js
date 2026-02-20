import Venue from "../models/venue.js";

/* ================= ADD VENUE ================= */

export const addVenue = async (req, res) => {
  try {
    const { name, sports, opentime, closetime, price } = req.body;

    if (!name || !sports || !opentime || !closetime || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const venue = await Venue.create({
      name,
      sports,
      opentime,
      closetime,
      price,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Venue added successfully",
      venue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= GET OWNER VENUES ================= */

export const getOwnerVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.user._id });

    res.status(200).json(venues);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ================= APPROVE VENUE ================= */

export const approveVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    venue.approved = true;
    await venue.save();

    res.status(200).json({
      message: "Venue approved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

