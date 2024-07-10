import express from "express";
import { createServer } from "node:http";
import { connectionDB } from "./connection.js";
import { PORT } from"./config.js"

connectionDB();
const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

app.post("/register", (req, res) => {});

app.post("/login", (req, res) => {});

app.post("/logout", (req, res) => {});

app.get("/protected", (req, res) => {});

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}}`);
});
