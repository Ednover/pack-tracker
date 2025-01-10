import { Router } from "express";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/admin.controllers";

const router = Router();

router.get("/packages", getPackages);
router.post("/packages/add", createPackage);
router.put("/packages/:id/update", updatePackage);
router.delete("/packages/:id/delete", deletePackage);

export default router;
