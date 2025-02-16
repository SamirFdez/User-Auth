import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const DB_CONNECTION = process.env.DB_CONNECTION;
export const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS.split(",");
export const JWT_KEY = process.env.JWT_KEY;
