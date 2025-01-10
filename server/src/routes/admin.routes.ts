import { Router } from "express";
import { getPackages, createPackage } from "../controllers/admin.controllers";

const router = Router();

router.get("/packages", getPackages);
router.post("/packages/add", createPackage);

export default router;
