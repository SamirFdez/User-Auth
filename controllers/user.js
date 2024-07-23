import { UserModel } from "../models/user.js";
import { validateUser, validatePatchUser } from "../schemas/user.js";
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

  // delete user by id
  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (id.length !== 24)
        return res.status(500).json({ message: "id is not valid" });

      const user = await UserModel.delete({ id });

      if (!user) return res.status(404).json({ message: "user not found" });

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Oops! error updating user" });
    }
  }

  // update user by id
  static async update(req, res) {
    try {
      const { id } = req.params;
      const result = validatePatchUser(req.body);

      if (id.length !== 24)
        return res.status(500).json({ message: "id is not valid" });

      if (result.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const user = await UserModel.update({
        id,
        input: result.data,
      });

      if (!user) return res.status(404).json({ message: "user not found" });

      res.json({ user, message: "user has been updated" });
    } catch (error) {
      res.status(500).json({ message: "Oops! error updating user" });
    }
  }

  // login user
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await UserModel.login({ username, password });

      if (!user._id) return res.status(400).json(user);

      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_KEY,
        { expiresIn: "7d" }
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

  // logout user
  static async logout(req, res) {
    res.clearCookie("access_token").json({ message: "Logout successful" });
  }
}
