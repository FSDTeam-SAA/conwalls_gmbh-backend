import { generateResponse } from "../../lib/responseFormate.js";
import {
  submitInsightEngine,
  getAllInsightEngines,
  getInsightEngineById,
  updateInsightEngine,
  deleteInsightEngine,
} from "./session.service.js";


export const submitInsightEngineController = async (req, res) => {
  try {
    const createdBy = req.user?._id || null;
    const payload = req.body;

    const data = await submitInsightEngine({ createdBy, payload });
    generateResponse(res, 201, true, "Insight Engine submitted successfully", data);
  } catch (error) {
    const status =
      error.message?.includes("required") || error.message?.includes("Invalid")
        ? 400
        : 500;

    generateResponse(res, status, false, error.message || "Failed to submit Insight Engine", null);
  }
};
export const getAllInsightEngineController = async (req, res) => {
  try {
    const { page, limit, search, date } = req.query;

    const { items, paginationInfo } = await getAllInsightEngines({
      page,
      limit,
      search,
      date,
    });

    generateResponse(res, 200, true, "Insight Engine list fetched successfully", {
      items,
      paginationInfo,
    });
  } catch (error) {
    generateResponse(res, 500, false, "Failed to fetch Insight Engine list", null);
  }
};

export const getSingleInsightEngineController = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await getInsightEngineById(id);
    generateResponse(res, 200, true, "Insight Engine fetched successfully", item);
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    generateResponse(res, status, false, error.message || "Failed to fetch Insight Engine", null);
  }
};

export const updateInsightEngineController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updated = await updateInsightEngine({ id, payload });
    generateResponse(res, 200, true, "Insight Engine updated successfully", updated);
  } catch (error) {
    const status =
      error.message?.includes("required") ? 400
      : error.message?.includes("not found") ? 404
      : 500;

    generateResponse(res, status, false, error.message || "Failed to update Insight Engine", null);
  }
};

export const deleteInsightEngineController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteInsightEngine(id);
    generateResponse(res, 200, true, "Insight Engine deleted successfully", null);
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    generateResponse(res, status, false, error.message || "Failed to delete Insight Engine", null);
  }
};
