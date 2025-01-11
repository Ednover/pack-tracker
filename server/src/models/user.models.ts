import { Schema, model } from "mongoose";
import { UserI } from "../interfaces/user.interfaces";

const userSchema = new Schema<UserI>({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
});

export default model<UserI>("User", userSchema);
