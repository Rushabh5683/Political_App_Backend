import { UserService } from "../services/user.service.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {

  try {

    const user = await UserService.register(req.body);

    res.json({
      user,
      token: generateToken(user)
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {

  try {

    const user = await UserService.login(
      req.body.email,
      req.body.password
    );

    res.json({
      user,
      token: generateToken(user)
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {

    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await UserService.getUsers({
      page,
      limit,
      search,
    });

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {

  try {

    const user = await UserService.getUserById(req.params.id);

    res.json(user);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {

  try {

    const user = await UserService.updateUser(
      req.params.id,
      req.body,
      req.user
    );

    res.json(user);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {

  try {

    const result = await UserService.deleteUser(req.params.id);

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};