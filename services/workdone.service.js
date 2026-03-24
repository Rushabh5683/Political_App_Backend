import WorksDone from "../models/worksDone.js";
import Media from "../models/media.model.js";
import { Op } from "sequelize";

export class WorksDoneService {

  // Create
  static async createWork(data) {
    return await WorksDone.create(data);
  }

  // Get all
static async getWorks({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;

    const where = search
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
            { location: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows } = await WorksDone.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["date", "DESC"]],

      include: [
        {
          model: Media,
          as: "media", // ✅ same as association
          attributes: ["id", "image"],
        },
      ],
    });

    // 🔥 SAME STYLE AS QUERY (but with transformation)
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    const works = rows.map((work) => {
      const data = work.toJSON();

      if (data.media?.image) {
        data.media.image = `${BASE_URL}/uploads/${data.media.image}`;
      }

      return data;
    });

    return {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(count / limit),
      works,
    };
  }

  // Get by ID
  static async getWorkById(id) {

    const work = await WorksDone.findByPk(id);

    if (!work) {
      throw new Error("Work not found");
    }

    return work;
  }

  // Update
  static async updateWork(id, data) {

    const work = await WorksDone.findByPk(id);

    if (!work) {
      throw new Error("Work not found");
    }

    await work.update(data);

    return work;
  }

  // Delete
  static async deleteWork(id) {

    const work = await WorksDone.findByPk(id);

    if (!work) {
      throw new Error("Work not found");
    }

    await work.destroy();

    return { message: "Work deleted successfully" };
  }

}