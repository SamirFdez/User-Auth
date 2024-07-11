import { UserModel } from "../models/user.js";
import { validateUser } from "../schemas/user.js";

export class UserController {
  //get all users
  static async getAll(req, res) {
    const users = await UserModel.getAll();
    res.json(users);
  }

  static async getByUsername(req, res) {}

  //register a user
  static async register(req, res) {
    const result = validateUser(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await UserModel.register({ input: result.data });
    res.json(newUser);
  }

  static async delete(req, res) {}

  static async update(req, res) {}

  static async login(req, res) {
    const { username, password } = req.body;

    try {
    } catch (error) {}
  }

  static async logout(req, res) {}

  static async protected(req, res) {}
}
