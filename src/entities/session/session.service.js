import InsightEngine from "./session.model.js";
import { createFilter, createPaginationInfo } from "../../lib/pagination.js";
import mongoose from "mongoose";
import Stakeholder from "../stackholder/stackholder.model.js";

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

export const updateInsightEngine = async ({ id, payload, creatorId }) => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Update payload is required");
  }

  const existing = await InsightEngine.findById(id);
  if (!existing) {
    throw new Error("InsightEngine not found");
  }
  if (creatorId && existing.createdBy?.toString() !== creatorId.toString()) {
    throw new Error("Unauthorized: You can only update your own InsightEngine");
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

export const getStakeholdersAndMeasures = async (insightEngineId) => {
  if (!mongoose.Types.ObjectId.isValid(insightEngineId)) {
    throw new Error("Invalid insightEngineId");
  }

  // ✅ check insight engine exists
  const insightEngine = await InsightEngine.findById(insightEngineId);
  if (!insightEngine) {
    throw new Error("InsightEngine not found");
  }

  // ✅ aggregate stakeholders + measures
  const stakeholders = await Stakeholder.aggregate([
    {
      $match: {
        insightEngineId: new mongoose.Types.ObjectId(insightEngineId),
      },
    },
    {
      $lookup: {
        from: "measures",
        localField: "_id",
        foreignField: "stakeholderId",
        as: "measures",
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return {
    insightEngine,
    stakeholders,
  };
};