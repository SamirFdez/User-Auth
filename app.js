import express, { json } from "express";
import { connectionDB } from "./connection.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { createUserRouter } from "./routes/users.js";
import { PORT } from "./config.js";

connectionDB();

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/users", createUserRouter());

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}}`);
});
