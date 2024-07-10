import mongoose from "mongoose";
import { DB_CONNECTION } from "./config.js";

export const connectionDB = () => {
  const uri = DB_CONNECTION;
  const db = mongoose.connection;
  
  mongoose
    .connect(uri, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    .catch((err) => console.log(err));

  db.on("open", (_) => {
    console.log(`Database ${db.name} is connected`);
  });

  db.on("error", (err) => {
    console.log(err);
  });
};
