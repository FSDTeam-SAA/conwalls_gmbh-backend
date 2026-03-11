// systemSetting.controller.js
import { generateResponse } from "../../lib/responseFormate.js";
import {
  getSystemSettingService,
  getSystemSettingByIdService,
  createSystemSettingService,
  updateSystemSettingService,
  deleteSystemSettingService
} from "./systemSetting.service.js";

export const getSystemSettingController = async (req, res, next) => {
  try {
    const data = await getSystemSettingService();
    return generateResponse(res, 200, true, "System settings fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

export const getSingleSystemSettingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getSystemSettingByIdService(id);

    if (!data) {
      return generateResponse(res, 404, false, "System setting not found", null);
    }

    return generateResponse(res, 200, true, "System setting fetched successfully", data);
  } catch (error) {
    next(error);
  }
};

export const createSystemSettingController = async (req, res, next) => {
  try {
    const created = await createSystemSettingService(req.body);
    return generateResponse(res, 201, true, "System settings created successfully", created);
  } catch (error) {
    next(error);
  }
};

export const updateSystemSettingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await updateSystemSettingService(id, req.body);

    if (!updated) {
      return generateResponse(res, 404, false, "System setting not found", null);
    }

    return generateResponse(res, 200, true, "System settings updated successfully", updated);
  } catch (error) {
    next(error);
  }
};

export const deleteSystemSettingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteSystemSettingService(id);

    return generateResponse(
      res,
      200,
      true,
      deleted ? "System settings deleted successfully" : "System setting not found",
      deleted
    );
  } catch (error) {
    next(error);
  }
};


export const getFilteredHelpTextsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const systemSetting = await getSystemSettingByIdService(id);

    if (!systemSetting) {
      return generateResponse(res, 404, false, "System setting not found", null);
    }

    const targetNames = [
      "Pain point",
      "Benefits",
      "Objections/Concerns",
      "Objection Handling",
      "callToAction"
      
    ];

    const helpTexts = Array.isArray(systemSetting.helpTexts)
      ? systemSetting.helpTexts
      : [];

    const filtered = helpTexts.filter((item) => targetNames.includes(item?.name));

    return generateResponse(
      res,
      200,
      true,
      "Filtered help texts fetched successfully",
      filtered
    );
  } catch (error) {
    next(error);
  }
};
