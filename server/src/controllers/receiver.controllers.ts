import { Request, Response } from "express";
import Package from "../models/Package";

export const getPackageByTrackingID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageData = await Package.findOne({ trackingID: id });
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching package" });
  }
};