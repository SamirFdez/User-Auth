import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const createUserRouter = () => {
  const usersRouter = Router();

  usersRouter.get("/", UserController.getAll);

  usersRouter.get("/:username", UserController.getByUsername);

  usersRouter.post("/register", UserController.register);

  usersRouter.delete("/:username", UserController.delete);

  usersRouter.patch("/:username", UserController.update);

  usersRouter.post("/login", UserController.login);

  usersRouter.post("/logout", UserController.logout);

  usersRouter.get("/protected", UserController.protected);

  return usersRouter;
};
