import express from "express";
import { createServer } from "node:http";
import { PORT } from "./config.js";

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

app.post("/login", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}}`);
});
