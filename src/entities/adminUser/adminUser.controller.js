// src/entities/adminUser/adminUser.controller.js
import { generateResponse } from "../../lib/responseFormate.js";
import RoleType from "../../lib/types.js";
import {
  adminCreateUserService,
  adminListUsersService,
  adminUpdateUserRoleService,
  adminUpdateUserStatusService,
  adminDeleteUserService,
  adminGetSingleUserService
} from "./adminUser.service.js";

const handleControllerError = (err, res, next) => {
  if (err?.statusCode) {
    return generateResponse(res, err.statusCode, false, err.message || "Error", null);
  }
  return next(err);
};

const formatUser = (user) => {
  if (!user) return user;

  const {
    _id,
    name,
    email,
    phone,
    dob,
    gender,
    role,
    status,
    createdBy,
    updatedBy,
    stripeAccountId,
    bio,
    profileImage,
    multiProfileImage,
    pdfFile,
    isVerified,
    hasActiveSubscription,
    subscriptionExpireDate,
    blockedUsers,
    language,
    address,
    createdAt,
    updatedAt,
    ...rest
  } = user;

  return {
    _id,
    name,
    email,
    phone,
    dob,
    gender,
    role,
    status,
    createdBy,
    updatedBy,
    stripeAccountId,
    bio,
    profileImage,
    multiProfileImage,
    pdfFile,
    isVerified,
    hasActiveSubscription,
    subscriptionExpireDate,
    blockedUsers,
    language,
    address,
    createdAt,
    updatedAt,
    ...rest
  };
};

export const adminCreateUserController = async (req, res, next) => {
  try {
    const user = await adminCreateUserService(req.body, req.user?._id);

    return generateResponse(res, 201, true, "User created successfully", formatUser(user));
  } catch (err) {
    return handleControllerError(err, res, next);
  }
};

export const adminListUsersController = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const role = RoleType.TRAINER;
    const data = await adminListUsersService({ page, limit, role });
    const formattedItems = Array.isArray(data?.items) ? data.items.map(formatUser) : [];
    return generateResponse(
      res,
      200,
      true,
      "Users fetched successfully",
      { ...data, items: formattedItems }
    );
  } catch (err) {
    next(err);
  }
};

export const adminUpdateUserRoleController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status, name, email, phone, password } = req.body;

    const updated = await adminUpdateUserRoleService(
      id,
      role,
      status,
      req.user?._id,
      { name, email, phone, password }
    );
    if (!updated) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User updated successfully", formatUser(updated));
  } catch (err) {
    return handleControllerError(err, res, next);
  }
};

export const adminUpdateUserStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await adminUpdateUserStatusService(id, status, req.user?._id);
    if (!updated) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User status updated successfully", formatUser(updated));
  } catch (err) {
    return handleControllerError(err, res, next);
  }
};

export const adminDeleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await adminDeleteUserService(id);
    if (!deleted) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User deleted successfully", formatUser(deleted));
  } catch (err) {
    next(err);
  }
};

export const adminGetSingleUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await adminGetSingleUserService(id);

    if (!user || user.role !== RoleType.TRAINER) {
      return generateResponse(res, 404, false, "User not found", null);
    }

    return generateResponse(res, 200, true, "User fetched successfully", formatUser(user));
  } catch (error) {
    return handleControllerError(error, res, next);
  }
};
