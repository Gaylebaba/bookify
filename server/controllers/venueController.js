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


/* ================= APPROVE VENUE (ADMIN) ================= */

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


/* ================= UPDATE VENUE (OWNER) ================= */

export const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    if (venue.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    venue.name = req.body.name || venue.name;
    venue.sports = req.body.sports || venue.sports;
    venue.opentime = req.body.opentime || venue.opentime;
    venue.closetime = req.body.closetime || venue.closetime;
    venue.price = req.body.price || venue.price;

    // 🔒 Require re-approval after update
    venue.approved = false;

    await venue.save();

    res.status(200).json({
      message: "Venue updated successfully. Awaiting admin approval.",
      venue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* ================= GET ALL APPROVED VENUES (PUBLIC) ================= */

export const getApprovedVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ approved: true });

    res.status(200).json(venues);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/* ================= GET SINGLE VENUE ================= */

export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        message: "Venue not found",
      });
    }

    res.status(200).json(venue);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate("owner", "name email");
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};