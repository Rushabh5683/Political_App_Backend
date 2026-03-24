import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import cors from "cors";

import fs from "fs";            // ✅ ADD
import path from "path";        // ✅ ADD

import userRoutes from "./routes/user.routes.js";
import queryRoutes from "./routes/query.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import workdoneRoutes from "./routes/workdone.routes.js";

import "./models/association.js";

dotenv.config();

const app = express();

/// 🔥 CREATE UPLOADS FOLDER (IMPORTANT FIX)
const uploadPath = path.resolve("uploads"); 
console.log("UPLOAD PATH:", uploadPath);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ MIDDLEWARE
app.use(express.json());
app.use(cors());

// ✅ STATIC
app.use("/uploads", express.static(uploadPath));

// ✅ ROUTES
app.use("/api/users", userRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/worksdone", workdoneRoutes);

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

// ✅ START SERVER
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ✅");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });

  } catch (error) {
    console.error("Server error:", error);
  }
};

startServer();