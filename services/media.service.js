import Media from "../models/media.model.js";
import { Op } from "sequelize";

export class MediaService {

  // Create media
  static async createMedia(file, body) {

    if (!file) {
      throw new Error("Image is required");
    }

    const media = await Media.create({
      image: file.filename,
      type: body.type,
      sequence: body.sequence
    });

    return media;
  }

  // Get all media
static async getMedia({ page = 1, limit = 10, search = "", type, baseUrl }) {
  const offset = (page - 1) * limit;

  // 🔍 WHERE CONDITION
  let where = {};

  if (search) {
    where[Op.or] = [
      { image: { [Op.iLike]: `%${search}%` } },
    ];
  }

  // ✅ ADD TYPE FILTER
  if (type) {
    where.type = type; // e.g. "BANNER"
  }

  const { count, rows } = await Media.findAndCountAll({
    where,
    order: [["sequence", "ASC"]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    media: rows.map((m) => ({
      ...m.dataValues,
      image: baseUrl + "/uploads/" + m.image,
    })),
    total: count,
    page: parseInt(page),
    pages: Math.ceil(count / limit),
  };
}

  // Get media by ID
  static async getMediaById(id, baseUrl) {

    const media = await Media.findByPk(id);

    if (!media) {
      throw new Error("Media not found");
    }

    return {
      ...media.dataValues,
      image: baseUrl + "/uploads/" + media.image
    };
  }

  // Update media
  static async updateMedia(id, body, file) {

  const media = await Media.findByPk(id);

  if (!media) {
    throw new Error("Media not found");
  }

  const updateData = {
    type: body.type,
    sequence: body.sequence,
    status: body.status, // ✅ ADD THIS
  };

  if (file) {
    updateData.image = file.filename;
  }

  await media.update(updateData);

  return media;
}

  // Delete media
  static async deleteMedia(id) {

    const media = await Media.findByPk(id);

    if (!media) {
      throw new Error("Media not found");
    }

    await media.destroy();

    return { message: "Media deleted successfully" };
  }

}