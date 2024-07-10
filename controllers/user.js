import User from "../schemas/user";
import { validateUser } from "../schemas/user";

export const createUser = async (input) => {
  const result = validateUser(input);
  const query = { username: result.data.username };

  try {
    const user = await User.findOne(query)

    if (user) throw new Error("username already exists");

    
  } catch (error) {
    console.log("Oops! Error creating a user:", err)
  }

};

