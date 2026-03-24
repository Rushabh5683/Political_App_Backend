import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const WorksDone = sequelize.define("works_done", {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  media_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  timestamps: true
});

export default WorksDone;