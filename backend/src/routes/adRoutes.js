import express from "express";
import multer from "multer";
import { createAd, getAds, updateAd, deleteAd } from "../controllers/adController.js";

const router = express.Router();

// Multer storage (disk)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.includes(".") ? "." + file.originalname.split(".").pop() : "";
    cb(null, `${unique}${ext}`);
  },
});
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};
const upload = multer({
  storage,
  fileFilter,
  limits: { files: 5, fileSize: 5 * 1024 * 1024 },
});

// CRUD
router.post("/", upload.array("images", 5), createAd);
router.get("/", getAds);
router.put("/:id", upload.array("images", 5), updateAd);
router.delete("/:id", deleteAd);

export default router;