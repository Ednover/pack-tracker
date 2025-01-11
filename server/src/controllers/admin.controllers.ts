import { Request, Response } from "express";
import Package from "../models/Package";
import { generateTrackingId } from "../utils/generateID";
import { createTransporter, sendMail } from "../utils/emailer";
import { PackageI, TrackingI } from "../interfaces/Package.interfaces";

export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};

export const getPackageByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageData = await Package.findById(id);
    if (!packageData) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching package" });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const trackingID = generateTrackingId();
    const tracking: TrackingI = {
      currentLocation: "En el alamacén de Mérida",
      currentStatus: "En preparación",
      lastUpdate: new Date(),
      history: [],
    };
    const packageData: PackageI = {
      trackingID,
      tracking,
      ...req.body,
    };
    const newPackage = await Package.create(packageData);

    const { email } = req.body.receiver;
    const transporter = createTransporter();
    const sendEmail = async () => {
      await sendMail(
        transporter,
        email,
        `<p>Su paquete ya esta en preparación, se código de rastreo es: <b>${trackingID}</b></p>`,
        "Paquete en preparación"
      );
    };

    sendEmail().catch(console.error);

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Error creating package" });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { location, status } = req.body;
    const packageData = await Package.findById(id);

    if (!packageData) {
      res.status(404).json({ message: "Package not found" });
      return;
    }

    packageData.tracking.history.push({
      location: packageData.tracking.currentLocation,
      timestamp: packageData.tracking.lastUpdate,
      status: packageData.tracking.currentStatus,
    });

    packageData.tracking.currentLocation = location;
    packageData.tracking.currentStatus = status;
    packageData.tracking.lastUpdate = new Date();

    const updatePackage = await packageData.save();

    const { email } = updatePackage.receiver;
    const transporter = createTransporter();
    const sendEmail = async () => {
      await sendMail(
        transporter,
        email,
        `<p><b>Información de su paquete</b><br/>Estado: ${status}<br />Ubicación: ${location}<br /> No olvide que su código de rastreo es: <b>${updatePackage.trackingID}</b></p>`,
        `Actualización de paquete`
      );
    };

    sendEmail().catch(console.error);

    res.status(200).json(updatePackage);
  } catch (error) {
    res.status(500).json({ message: "Error updating package" });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageData = await Package.findByIdAndDelete({ _id: id });
    if (!packageData) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting package" });
  }
};
