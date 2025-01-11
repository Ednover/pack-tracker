import { Router } from "express";
import {
  getPackages,
  getPackageByID,
  createPackage,
  updatePackage,
  deletePackage,
  generateReport,
} from "../controllers/admin.controllers";
import { tokenValidator } from "../middleware/auth.middleware";

const router = Router();

router.use(tokenValidator());
router.get("/packages", getPackages);
router.get("/package/:id", getPackageByID);
router.post("/packages/add", createPackage);
router.put("/packages/:id/update", updatePackage);
router.delete("/packages/:id/delete", deletePackage);
router.get("/reports/:date", generateReport);

export default router;
