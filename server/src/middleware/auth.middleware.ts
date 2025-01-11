import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jsonwebtoken";

export const tokenValidator = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("No token provided");
    await decodeToken(token.replace("Bearer ", ""));
    next();
  } catch (err) {
    next(err);
  }
};
