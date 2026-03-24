import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Query = sequelize.define(
  "queries",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adminRemark: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "INPROGRESS", "COMPLETED", "REJECTED"),
      defaultValue: "PENDING",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true },
);

export default Query;
