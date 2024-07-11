import mongoose from "mongoose";
import z from "zod";

// schema for mongo DB
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

export const User = mongoose.model("User", userSchema);

// Schema for validations with zod
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
      .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
        message: "password must have a special symbol or character",
      }),
    confirmPassword: z.string({
      required_error: "confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export function validateUser(input) {
  return userValidation.safeParse(input);
}

export function validatePartialUser(input) {
  return userValidation.partial().safeParse(input);
}
