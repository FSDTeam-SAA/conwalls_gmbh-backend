import Measure from "./measure.model.js";

export const createMeasure = async ({ stakeholderId, insightEngineId, payload, createdBy }) => {
  return await Measure.create({ stakeholderId, insightEngineId, createdBy, ...payload });
};

export const getMeasuresByStakeholder = async (stakeholderId) => {
  return await Measure.find({ stakeholderId }).select("-__v").sort({ createdAt: 1 });
};

export const getMeasureById = async (id) => {
  const item = await Measure.findById(id).select("-__v");
  if (!item) throw new Error("Measure not found");
  return item;
};

export const updateMeasure = async ({ id, payload, creatorId }) => {
  if (!payload || Object.keys(payload).length === 0)
    throw new Error("Update payload is required");

  const existing = await Measure.findById(id);
  if (!existing) throw new Error("Measure not found");

  if (creatorId && existing.createdBy?.toString() !== creatorId.toString())
    throw new Error("Unauthorized: You can only update your own Measure");

  return await Measure.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-__v");
};

export const deleteMeasure = async (id) => {
  const deleted = await Measure.findByIdAndDelete(id);
  if (!deleted) throw new Error("Measure not found");
  return true;
};