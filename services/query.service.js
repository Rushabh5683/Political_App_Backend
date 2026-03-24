import Query from "../models/query.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";

export class QueryService {

  // Create Query
  static async createQuery(data) {
    return await Query.create(data);
  }

  // Get All Queries
 static async getQueries({ page = 1, limit = 10, search = "", status }) {
    const offset = (page - 1) * limit;

    // 🔍 WHERE CONDITION
    let whereCondition = {};

    if (search) {
      whereCondition[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (status) {
      whereCondition.status = status;
    }

    const { count, rows } = await Query.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(count / limit),
      queries: rows,
    };
  }

  // Get Query By ID
  static async getQueryById(id) {

    const query = await Query.findByPk(id);

    if (!query) {
      throw new Error("Query not found");
    }

    return query;
  }

  // Update Query
  static async updateQuery(id, data, currentUser) {

    const query = await Query.findByPk(id);

    if (!query) {
      throw new Error("Query not found");
    }

    // Only admin can change status
    if (data.status && currentUser.role !== "ADMIN") {
      throw new Error("Only admin can update query status");
    }

    // Owner or admin can update
    if (currentUser.role !== "ADMIN" && currentUser.id !== query.userId) {
      throw new Error("Not authorized to update this query");
    }

    await query.update(data);

    return query;
  }

  static async getQueriesByUserId(userId) {
  const queries = await Query.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  return queries;
}

  // Delete Query
  static async deleteQuery(id, currentUser) {

    const query = await Query.findByPk(id);

    if (!query) {
      throw new Error("Query not found");
    }

    // Only admin can delete
    if (currentUser.role !== "ADMIN") {
      throw new Error("Only admin can delete queries");
    }

    await query.destroy();

    return { message: "Query deleted successfully" };
  }

}