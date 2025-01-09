import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

mongoose
  .connect(DATABASE_URL!)
  .then(() => {
    console.log("Connected to batabase");
    app
      .listen(PORT, () => {
        console.log("Server running at PORT:", PORT);
      })
      .on("error", (error) => {
        throw new Error(error.message);
      });
  })
  .catch((err) => console.log("Connection failed", err));
