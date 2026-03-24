import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Media = sequelize.define(
  "media",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
    },

    sequence: {
      type: DataTypes.INTEGER,
    },

    // ✅ NEW FIELD
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default Media;