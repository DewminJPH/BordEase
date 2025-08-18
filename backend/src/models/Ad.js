import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    houseName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    contact: { type: String, required: true, trim: true },

    bedrooms: { type: Number, default: 0, min: 0 },
    bathrooms: { type: Number, default: 0, min: 0 },
    rooms: { type: Number, default: 0, min: 0 },
    persons: { type: Number, default: 0, min: 0 },

    distance: { type: String, default: "" },
    notes: { type: String, default: "" },

    images: { type: [String], default: [] },     // full URLs (served from /uploads)
    rating: { type: Number, min: 0, max: 5, default: 3 }, // optional for star display
    memberName: { type: String, default: "" },   // optional
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", adSchema);
export default Ad;