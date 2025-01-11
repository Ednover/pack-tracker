import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import User from "../models/user.models";
import { generateToken } from "../utils/jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username }).lean();
    if (!user) {
      res.status(401).json({ message: "User no exist" });
      return;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = await generateToken({ username: username, idUser: user._id.toString() });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Error login" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User create" });
  } catch (err) {
    res.status(500).json({ message: "Error register" });
  }
};
