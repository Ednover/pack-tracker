import { Router } from "express";
import {
  getPackages,
  getPackageByID,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/admin.controllers";
import { tokenValidator } from "../middleware/auth.middleware";

const router = Router();

router.use(tokenValidator());
router.get("/packages", getPackages);
router.get("/package/:id", getPackageByID);
router.post("/packages/add", createPackage);
router.put("/packages/:id/update", updatePackage);
router.delete("/packages/:id/delete", deletePackage);

export default router;
