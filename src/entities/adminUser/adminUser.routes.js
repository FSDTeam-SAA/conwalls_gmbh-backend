// src/entities/adminUser/adminUser.routes.js
import { Router } from "express";
import { verifyToken, adminMiddleware } from "../../core/middlewares/authMiddleware.js";

import {
  adminCreateUserController,
  adminListUsersController,
  adminUpdateUserRoleController,
  adminDeleteUserController,
  adminGetSingleUserController
} from "./adminUser.controller.js";

const router = Router();

// admin only
router.post("/", verifyToken, adminMiddleware, adminCreateUserController);
router.get("/", verifyToken, adminMiddleware, adminListUsersController);
router.get("/:id", verifyToken, adminMiddleware, adminGetSingleUserController);

router.patch("/:id/role", verifyToken, adminMiddleware, adminUpdateUserRoleController);
router.delete("/:id", verifyToken, adminMiddleware, adminDeleteUserController);

export default router;
