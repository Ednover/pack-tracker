import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routes/admin.routes";
import receiverRoutes from "./routes/receiver.routes";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/receiver", receiverRoutes);

mongoose
  .connect(DATABASE_URI!)
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
