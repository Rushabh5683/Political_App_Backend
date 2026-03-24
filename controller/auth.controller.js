import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });
};