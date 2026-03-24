import express from "express";
import {
  createWork,
  getWorks,
  getWorkById,
  updateWork,
  deleteWork
} from "../controller/workdone.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import mediaUrl, { upload } from "../middleware/mediaUrl.middleware.js";


const router = express.Router();

// Create (Admin only)
router.post("/", protect, authorize("ADMIN"),upload.single("image"), createWork);

// Get all (Public or protected based on your need)
router.get("/",mediaUrl,protect, getWorks);

// Get by ID
router.get("/:id", getWorkById);

// Update (Admin only)
router.put("/:id", protect, authorize("ADMIN"),upload.single("image"), updateWork);

// Delete (Admin only)
router.delete("/:id", protect, authorize("ADMIN"), deleteWork);

export default router;