// systemSetting.routes.js
import { Router } from "express";
import {
  getSystemSettingController,
  getSingleSystemSettingController,
  createSystemSettingController,
  updateSystemSettingController,
  deleteSystemSettingController
} from "./systemSetting.controller.js";

import { verifyToken, adminMiddleware } from "../../core/middlewares/authMiddleware.js";

const router = Router();

// Admin only
router.get("/", verifyToken, getSystemSettingController);
router.get("/:id",getSingleSystemSettingController);

router.post("/", verifyToken, adminMiddleware, createSystemSettingController);

router.put("/:id", verifyToken, adminMiddleware, updateSystemSettingController);
router.delete("/:id", verifyToken, adminMiddleware, deleteSystemSettingController);

export default router;
