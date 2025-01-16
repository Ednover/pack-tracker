import { Request, Response } from "express";
import Package from "../models/package.models";
import { generateTrackingId } from "../utils/generateID";
import { createTransporter, sendMail } from "../utils/emailer";
import {
  PackageDBI,
  PackageI,
  TrackingI,
} from "../interfaces/Package.interfaces";
import { packageStatus } from "../utils/packageStatus";
import { mapToPackageAdminDTO } from "../dtos/packageAdmin.dtos";
import { mapToReportDTO } from "../dtos/report.dtos";

export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages: PackageDBI[] = await Package.find();
    const mappedPackages = packages.map(mapToPackageAdminDTO);
    res.status(200).json(mappedPackages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};

export const getPackageByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageData: PackageDBI | null = await Package.findById(id);
    if (!packageData) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    const mappedPackage = mapToPackageAdminDTO(packageData);
    res.status(200).json(mappedPackage);
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
    const newPackage: PackageDBI = await Package.create(packageData);

    const { email } = req.body.receiver;
    const transporter = createTransporter();
    const sendEmail = async () => {
      await sendMail(
        transporter,
        email,
        `<p>Su paquete ya esta en preparación, su código de rastreo es: <b>${trackingID}</b></p>`,
        "Paquete en preparación"
      );
    };

    sendEmail().catch(console.error);

    res.status(201).json(newPackage.trackingID);
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

    const updatePackage: PackageDBI = await packageData.save();

    const mappedPackage = mapToPackageAdminDTO(packageData);

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

    res.status(200).json(mappedPackage);
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

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;

    const CURRENTTIME = 6 * 60 * 60 * 1000;
    const DAY_HOURS = 24 * 60 * 60 * 1000;

    const startOfDay = new Date(date);
    startOfDay.setTime(startOfDay.getTime() + CURRENTTIME);
    const endOfDay = new Date(date);
    endOfDay.setTime(startOfDay.getTime() + DAY_HOURS);

    const packagesCreated = await Package.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    const listPackages: PackageDBI[] = await Package.find({
      "tracking.lastUpdate": { $gte: startOfDay, $lte: endOfDay },
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    const preparationPackages: PackageDBI[] = await Package.find({
      "tracking.currentStatus": packageStatus.in_preparation,
      "tracking.lastUpdate": { $gt: startOfDay, $lt: endOfDay },
    });
    const progressPackages: PackageDBI[] = await Package.find({
      "tracking.currentStatus": packageStatus.in_progress,
      "tracking.lastUpdate": { $gte: startOfDay, $lt: endOfDay },
    });
    const deliveryPackages: PackageDBI[] = await Package.find({
      "tracking.currentStatus": packageStatus.delivery,
      "tracking.lastUpdate": { $gte: startOfDay, $lt: endOfDay },
    });

    const mappedReport = mapToReportDTO({
      packagesCreated,
      preparationPackages,
      progressPackages,
      deliveryPackages,
      listPackages,
    });

    res.status(200).json(mappedReport);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating report" });
  }
};
