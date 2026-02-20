import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sports: {
      type: String,
      required: true,
    },

    opentime: {
      type: String,
      required: true,
    },

    closetime: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
