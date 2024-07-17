import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token verification failed" });
    }

    req.user = user;
    next();
  });
};
