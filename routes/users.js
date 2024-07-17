import { Router } from "express";
import { UserController } from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authorization.js";

export const createUserRouter = () => {
  const usersRouter = Router();

  usersRouter.get("/", authenticateToken, UserController.getAll);

  usersRouter.get(
    "/:username",
    authenticateToken,
    UserController.getByUsername
  );

  usersRouter.post("/register", UserController.register);

  usersRouter.delete("/:username", authenticateToken, UserController.delete);

  usersRouter.patch("/:username", authenticateToken, UserController.update);

  usersRouter.post("/login", UserController.login);

  usersRouter.post("/logout", UserController.logout);

  return usersRouter;
};
