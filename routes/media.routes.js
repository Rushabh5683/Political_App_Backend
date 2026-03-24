import express from "express";
import {
  uploadMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} from "../controller/media.controller.js";

import mediaUrl, { upload } from "../middleware/mediaUrl.middleware.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

// Upload media (Admin)
router.post("/media", protect, authorize("ADMIN"), upload.single("image"), uploadMedia);

// Get all media
router.get("/media", mediaUrl,protect, getMedia);

// Get media by ID
router.get("/media/:id", mediaUrl,protect, getMediaById);

// Update media (Admin)
router.put("/media/:id", protect, authorize("ADMIN"), upload.single("image"), updateMedia);

// Delete media (Admin)
router.delete("/media/:id", protect, authorize("ADMIN"), deleteMedia);

export default router;