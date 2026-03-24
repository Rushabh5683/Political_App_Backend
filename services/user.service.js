import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

export class UserService {
  // Register
  static async register(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  // Login
  static async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Invalid password");

    return user;
  }

  // Get all users

  static async getUsers({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;

    // 🔍 Search condition
    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    // 🔥 find + count
    const { count, rows } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    return {
      users: rows,
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
    };
  }

  // Get user by id
  static async getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    return user;
  }

  // Update user
  static async updateUser(id, data, currentUser) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    // Authorization logic moved here
    if (currentUser.id != id && currentUser.role !== "ADMIN") {
      throw new Error("You can only update your own profile");
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(data);

    return user;
  }

  // Delete user
  static async deleteUser(id) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found");

    await user.destroy();

    return { message: "User deleted successfully" };
  }
}
