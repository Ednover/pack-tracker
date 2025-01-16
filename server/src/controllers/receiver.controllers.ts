import { Request, Response } from "express";
import Package from "../models/package.models";
import { PackageDBI } from "../interfaces/Package.interfaces";
import { mapToPackageReceiverDTO } from "../dtos/packageReceiver.dtos";

export const getPackageByTrackingID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageData: PackageDBI | null = await Package.findOne({ trackingID: id });
    if (!packageData) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    const mappedPackage = mapToPackageReceiverDTO(packageData);
    res.status(200).json(mappedPackage);
  } catch (error) {
    res.status(500).json({ message: "Error fetching package" });
  }
};