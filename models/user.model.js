import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.TEXT
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "CLIENT"),
      defaultValue: "CLIENT"
    }
  },
  { timestamps: true }
);

export default User;