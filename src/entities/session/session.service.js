import InsightEngine from "./session.model.js";
import { createFilter, createPaginationInfo } from "../../lib/pagination.js";

export const submitInsightEngine = async ({ createdBy, payload }) => {

  const doc = await InsightEngine.create({
    createdBy: createdBy || null,
    ...payload,
  });

  return doc;
};

export const getParticipantOwnProjectsListService = async ({ page = 1, limit = 10, search, date, participantId }) => {
  const filter = createFilter(search, date);
  filter.createdBy = participantId;
  const total = await InsightEngine.countDocuments(filter);

  const items = await InsightEngine.find(filter)
    .select("-__v")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const paginationInfo = createPaginationInfo(page, limit, total);

  return { items, paginationInfo };
}

export const getAllInsightEngines = async ({ page = 1, limit = 10, search, date }) => {
  const filter = createFilter(search, date);

  const total = await InsightEngine.countDocuments(filter);

  const items = await InsightEngine.find(filter)
    .select("-__v")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const paginationInfo = createPaginationInfo(page, limit, total);

  return { items, paginationInfo };
};

export const getInsightEngineById = async (id) => {
  const item = await InsightEngine.findById(id).select("-__v");
  if (!item) throw new Error("InsightEngine not found");
  return item;
};

export const updateInsightEngine = async ({ id, payload }) => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Update payload is required");
  }

  const updated = await InsightEngine.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!updated) throw new Error("InsightEngine not found");
  return updated;
};

export const deleteInsightEngine = async (id) => {
  const deleted = await InsightEngine.findByIdAndDelete(id);
  if (!deleted) throw new Error("InsightEngine not found");
  return true;
};
