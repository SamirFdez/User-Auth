import { User } from "../schemas/user.js";
import bcrypt from "bcrypt";

export class UserModel {
  //get all users
  static async getAll() {
    try {
      const users = await User.find().select("-password -__v");
      return users;
    } catch (error) {
      return { message: "Oops! error getting all users" };
    }
  }

  //register a user
  static async register({ input }) {
    const { name, username, email, password } = input;

    const queryUser = { username: username };
    const optionsUser = { projection: { username: 1 } };

    try {
      const userExists = await User.findOne(queryUser, optionsUser);

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
    } catch (error) {
      throw new Error("Oops! error registering user ");
    }
  }

  static async login({ username, password }) {
    try {
      if (username === "" || password === "")
        return { message: "Complete all fields to log in" };

      const user = User.findOne({ username: username });
      if (!user) return { message: `${username} does not exist` };

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return { message: "password is invalid" };

      return user
    } catch (error) {
      return { message: "Oops! error occurred while trying to log in" };
    }
  }
}
