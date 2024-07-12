import { User } from "../schemas/user.js";
import bcrypt from "bcrypt";

export class UserModel {
  // get all users
  static async getAll() {
    const users = await User.find().select("-password -__v");
    return users;
  }

  // get user by username
  static async getByUsername({ username }) {
    const users = await User.find().select("-password -__v");
    const user = users.filter(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    return user;
  }

  // register a user
  static async register({ input }) {
    const { name, username, email, password } = input;

    const users = await User.find({}, "username").select("-password -__v");
    const userExists = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (userExists) return { message: `${username} already exists` };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    return { message: "user saved successfully" };
  }

  // login user
  static async login({ username, password }) {
    if (username === "" || password === "")
      return { message: "Complete all fields to log in" };

    const users = await User.find();
    const user = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) return { message: `${username} does not exist` };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return { message: "password is invalid" };

    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
