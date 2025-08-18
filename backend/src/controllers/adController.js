import Ad from "../models/Ad.js";
import { promises as fsp } from "fs";
import path from "path";

// Turn http://host/uploads/filename.jpg into uploads/filename.jpg
const localPathFromUrl = (fileUrl) => {
  try {
    const filename = path.basename(new URL(fileUrl).pathname);
    return path.join("uploads", filename);
  } catch {
    return null;
  }
};

// CREATE
export const createAd = async (req, res, next) => {
  try {
    const {
      houseName, location, price, contact,
      bedrooms, bathrooms, rooms, persons, distance, notes
    } = req.body;

    if (!houseName || !location || price === undefined || !contact) {
      return res.status(400).json({ message: "houseName, location, price and contact are required" });
    }

    const imageUrls = (req.files || []).map(
      (f) => `${req.protocol}://${req.get("host")}/uploads/${f.filename}`
    );

    const ad = await Ad.create({
      houseName: String(houseName).trim(),
      location: String(location).trim(),
      price: Number(price),
      contact: String(contact).trim(),
      bedrooms: bedrooms ? Number(bedrooms) : 0,
      bathrooms: bathrooms ? Number(bathrooms) : 0,
      rooms: rooms ? Number(rooms) : 0,
      persons: persons ? Number(persons) : 0,
      distance: distance || "",
      notes: notes || "",
      images: imageUrls,
    });

    res.status(201).json(ad);
  } catch (err) {
    if (err.name === "MulterError") err.status = 400;
    next(err);
  }
};

// READ (all)
export const getAds = async (_req, res, next) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    // Which existing images to keep (from client)
    let keepImages = ad.images;
    if (typeof req.body.keepImages === "string") {
      try { keepImages = JSON.parse(req.body.keepImages) || ad.images; } catch { /* ignore */ }
    }

    const newImageUrls = (req.files || []).map(
      (f) => `${req.protocol}://${req.get("host")}/uploads/${f.filename}`
    );
    const finalImages = [...keepImages, ...newImageUrls];

    // Remove files that were deselected
    const removed = (ad.images || []).filter((u) => !keepImages.includes(u));
    for (const url of removed) {
      const p = localPathFromUrl(url);
      if (p) await fsp.unlink(p).catch(() => {});
    }

    // Build update set (only set fields that were provided)
    const toNum = (v) => (v === undefined || v === "" ? undefined : Number(v));
    const maybe = (v) => (v === undefined ? undefined : String(v).trim());

    const updates = {
      houseName: maybe(req.body.houseName),
      location: maybe(req.body.location),
      price: toNum(req.body.price),
      contact: maybe(req.body.contact),
      bedrooms: toNum(req.body.bedrooms),
      bathrooms: toNum(req.body.bathrooms),
      rooms: toNum(req.body.rooms),
      persons: toNum(req.body.persons),
      distance: req.body.distance ?? undefined,
      notes: req.body.notes ?? undefined,
      images: finalImages,
    };

    Object.entries(updates).forEach(([k, v]) => {
      if (v !== undefined) ad[k] = v;
    });

    await ad.save();
    res.json(ad);
  } catch (err) {
    if (err.name === "MulterError") err.status = 400;
    next(err);
  }
};

// DELETE
export const deleteAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    for (const url of ad.images || []) {
      const p = localPathFromUrl(url);
      if (p) await fsp.unlink(p).catch(() => {});
    }
    await ad.deleteOne();

    res.json({ message: "Ad deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};