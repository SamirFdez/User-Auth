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

    const users = await User.find().select("-password -__v");
    const userExists = users.filter(
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

  static async login({ username, password }) {
    try {
      if (username === "" || password === "")
        return { message: "Complete all fields to log in" };

      const user = User.findOne({ username: username });
      if (!user) return { message: `${username} does not exist` };

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return { message: "password is invalid" };

      return user;
    } catch (error) {
      return { message: "Oops! error occurred while trying to log in" };
    }
  }
}
