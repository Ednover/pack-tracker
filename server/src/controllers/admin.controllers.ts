import { Request, Response } from "express";
import Package from "../models/Package";
import { generateTrackingId } from "../utils/generateID";
import { createTransporter, sendMail } from "../utils/emailer";

export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const trackingID = generateTrackingId();
    const tracking = {
        currentLocation: "En el alamacén de Mérida",
        currentStatus: "En preparación"
    }
    const packageData = {
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
        "Paquete en preparación",
      );
    };

    sendEmail().catch(console.error);

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Error creating package" });
  }
};
