import express from "express";
import {
  createQuery,
  getQueries,
  updateQuery,
  deleteQuery,
  getQueryById,
  getMyQueries
} from "../controller/query.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import mediaUrl, { upload } from "../middleware/mediaUrl.middleware.js";

const router = express.Router();

router.post("/", protect, mediaUrl, upload.single("attachment"), createQuery);
router.get("/", protect,authorize("ADMIN"), getQueries);
router.get("/my", protect, getMyQueries);
router.get("/:id",protect,getQueryById)
router.put("/:id", protect, updateQuery);
router.delete("/:id", protect, authorize("ADMIN"), deleteQuery);

export default router;