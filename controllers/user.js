import { UserModel } from "../models/user.js";
import { validateUser } from "../schemas/user.js";
import { JWT_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export class UserController {
  //get all users
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: "Oops! error getting all users" });
    }
  }

  // get user by username
  static async getByUsername(req, res) {
    const { username } = req.params;
    try {
      const user = await UserModel.getByUsername({ username });
      if (user) return res.json({ user });
      res.status(404).json({ message: "user not found" });
    } catch (error) {
      res.status(500).json({ message: "Oops! error getting user" });
    }
  }

  //register a user
  static async register(req, res) {
    try {
      const result = validateUser(req.body);

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const newUser = await UserModel.register({ input: result.data });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Oops! error registering user" });
    }
  }

  static async delete(req, res) {}

  static async update(req, res) {}

  // login user
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await UserModel.login({ username, password });
      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_KEY,
        { expiresIn: "1h" }
      );

      res
        .cookie("access_token", token, { httpOnly: true, sameSite: "strict" })
        .send({ user, token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Oops! error occurred while trying to log in" });
    }
  }

  static async logout(req, res) {}

  static async protected(req, res) {}
}
