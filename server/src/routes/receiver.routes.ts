import { Router } from "express";
import { getPackageByTrackingID } from "../controllers/receiver.controllers";

const router = Router();

router.get("/package/:id", getPackageByTrackingID);

export default router;