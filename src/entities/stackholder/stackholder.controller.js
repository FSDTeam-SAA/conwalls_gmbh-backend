import { generateResponse } from "../../lib/responseFormate.js";
import { createStakeholder, deleteStakeholder, getStakeholderById, getStakeholdersByProject, updateStakeholder } from "./stackholder.service.js";

export const createStakeholderController = async (req, res) => {
  try {
    const createdBy = req.user?._id || null;
    const { insightEngineId } = req.params;
    const data = await createStakeholder({ insightEngineId, payload: req.body, createdBy });
    generateResponse(res, 201, true, "Stakeholder created successfully", data);
  } catch (error) {
    generateResponse(res, 400, false, error.message || "Failed to create Stakeholder", null);
  }
};

export const getStakeholdersByProjectController = async (req, res) => {
  try {
    const { insightEngineId } = req.params;
    const data = await getStakeholdersByProject(insightEngineId);
    generateResponse(res, 200, true, "Stakeholders fetched successfully", data);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to fetch Stakeholders", null);
  }
};

export const getSingleStakeholderController = async (req, res) => {
  try {
    const { stakeholderId } = req.params;
    console.log("Fetching Stakeholder with ID:", stakeholderId, "mahabur");
    const data = await getStakeholderById(stakeholderId);
    generateResponse(res, 200, true, "Stakeholder fetched successfully", data);
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    generateResponse(res, status, false, error.message, null);
  }
};

export const updateStakeholderController = async (req, res) => {
  try {
    const creatorId = req.user?._id;
    const { stakeholderId } = req.params;
    const updated = await updateStakeholder({ id: stakeholderId, payload: req.body, creatorId });
    generateResponse(res, 200, true, "Stakeholder updated successfully", updated);
  } catch (error) {
    const status =
      error.message?.includes("not found") ? 404
      : error.message?.includes("Unauthorized") ? 403
      : 400;
    generateResponse(res, status, false, error.message, null);
  }
};

export const deleteStakeholderController = async (req, res) => {
  try {
    const { stakeholderId } = req.params;
    await deleteStakeholder(stakeholderId);
    generateResponse(res, 200, true, "Stakeholder deleted successfully", null);
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    generateResponse(res, status, false, error.message, null);
  }
};