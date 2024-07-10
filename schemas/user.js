import mongoose from "mongoose";
import bcrypt from "bcrypt";
import z from "zod";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

const userValidation = z
  .object({
    name: z.string({
      invalid_type_error: "name must be a string",
      required_error: "name is required",
    }),
    username: z.string({
      invalid_type_error: "username must be a string",
      required_error: "username is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "invalid email address" }),
    password: z
      .string({ required_error: "password is required" })
      .min(8, { message: "password must be 8 or more characters long" })
      .symbol(),
    confirmPassword: z
      .string({ required_error: "confirm password is required" })
      .min(8, {
        message: "confirm password must be 8 or more characters long",
      })
      .symbol(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default User;

export function validateUser(input) {
  return userValidation.safeParse(input);
}
