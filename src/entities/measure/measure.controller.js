import { generateResponse } from "../../lib/responseFormate.js";
import {
  createMeasure,
  getMeasuresByStakeholder,
  getMeasureById,
  updateMeasure,
  deleteMeasure,
} from "./measure.service.js";

export const createMeasureController = async (req, res) => {
  try {
    const createdBy = req.user?._id || null;
    const { stakeholderId, insightEngineId } = req.params;
    const data = await createMeasure({ stakeholderId, insightEngineId, payload: req.body, createdBy });
    generateResponse(res, 201, true, "Measure created successfully", data);
  } catch (error) {
    generateResponse(res, 400, false, error.message || "Failed to create Measure", null);
  }
};

export const getMeasuresByStakeholderController = async (req, res) => {
  try {
    const { stakeholderId } = req.params;
    const data = await getMeasuresByStakeholder(stakeholderId);
    generateResponse(res, 200, true, "Measures fetched successfully", data);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to fetch Measures", null);
  }
};

export const getSingleMeasureController = async (req, res) => {
  try {
    const { measureId } = req.params;
    const data = await getMeasureById(measureId);
    generateResponse(res, 200, true, "Measure fetched successfully", data);
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    generateResponse(res, status, false, error.message, null);
  }
};

export const updateMeasureController = async (req, res) => {
  try {
    const creatorId = req.user?._id;
    const { measureId } = req.params;
    const updated = await updateMeasure({ id: measureId, payload: req.body, creatorId });
    generateResponse(res, 200, true, "Measure updated successfully", updated);
  } catch (error) {
    const status =
      error.message?.includes("not found") ? 404
      : error.message?.includes("Unauthorized") ? 403
      : 400;
    generateResponse(res, status, false, error.message, null);
  }
};

export const deleteMeasureController = async (req, res) => {
  try {
    const { measureId } = req.params;
    await deleteMeasure(measureId);
    generateResponse(res, 200, true, "Measure deleted successfully", null);
  } catch (error) {
    const status = error.message?.includes("not found") ? 404 : 500;
    generateResponse(res, status, false, error.message, null);
  }
};

// ---

// ### Suggested Route Structure
// ```
// POST   /api/insight-engine/:insightEngineId/stakeholders          → create stakeholder
// GET    /api/insight-engine/:insightEngineId/stakeholders          → list stakeholders
// GET    /api/insight-engine/stakeholders/:id                       → single stakeholder
// PUT    /api/insight-engine/stakeholders/:id                       → update stakeholder
// DELETE /api/insight-engine/stakeholders/:id                       → delete stakeholder

// POST   /api/insight-engine/:insightEngineId/stakeholders/:stakeholderId/measures   → create measure
// GET    /api/insight-engine/stakeholders/:stakeholderId/measures                    → list measures
// GET    /api/insight-engine/measures/:id                                            → single measure
// PUT    /api/insight-engine/measures/:id                                            → update measure
// DELETE /api/insight-engine/measures/:id                                            → delete measure