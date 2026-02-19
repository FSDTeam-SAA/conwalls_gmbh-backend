// src/entities/adminUser/adminUser.controller.js
import { generateResponse } from "../../lib/responseFormate.js";
import {
  adminCreateUserService,
  adminListUsersService,
  adminUpdateUserRoleService,
  adminDeleteUserService,
  adminGetSingleUserService
} from "./adminUser.service.js";

export const adminCreateUserController = async (req, res, next) => {
  try {
    const user = await adminCreateUserService(req.body, req.user?._id);

    return generateResponse(res, 201, true, "User created successfully", user);
  } catch (err) {
    next(err);
  }
};

export const adminListUsersController = async (req, res, next) => {
  try {
    const { page, limit, role } = req.query;
    const data = await adminListUsersService({ page, limit, role });
    return generateResponse(res, 200, true, "Users fetched successfully", data);
  } catch (err) {
    next(err);
  }
};

export const adminUpdateUserRoleController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updated = await adminUpdateUserRoleService(id, role, req.user?._id);
    if (!updated) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User role updated successfully", updated);
  } catch (err) {
    next(err);
  }
};

export const adminDeleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await adminDeleteUserService(id);
    if (!deleted) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User deleted successfully", deleted);
  } catch (err) {
    next(err);
  }
};

export const adminGetSingleUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await adminGetSingleUserService(id);

    if (!user) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

