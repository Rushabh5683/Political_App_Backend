import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controller/user.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// User routes
router.get("/users", protect, authorize("ADMIN"), getUsers);
router.get("/users/:id", protect,authorize("ADMIN"), getUserById);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, authorize("ADMIN"), deleteUser);

export default router;