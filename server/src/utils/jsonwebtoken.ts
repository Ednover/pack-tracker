import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const decodeToken = async (token: string) => {
  const decoded = verify(token, JWT_SECRET!);
  return decoded;
};

export const generateToken = async (payload: object, time: string = "1h") => {
  return sign(payload, JWT_SECRET!, {
    expiresIn: time,
  });
};
