import Stakeholder from "./stackholder.model.js";


export const createStakeholder = async ({ insightEngineId, payload, createdBy }) => {
  return await Stakeholder.create({ insightEngineId, createdBy, ...payload });
};

export const getStakeholdersByProject = async (insightEngineId) => {
  return await Stakeholder.find({ insightEngineId }).select("-__v").sort({ createdAt: 1 });
};

export const getStakeholderById = async (id) => {
  console.log("Fetching Stakeholder with ID:", id, "mahabur->1");
  const item = await Stakeholder.findById(id).select("-__v");
  if (!item) throw new Error("Stakeholder not found");
  return item;
};

export const updateStakeholder = async ({ id, payload, creatorId }) => {
  if (!payload || Object.keys(payload).length === 0)
    throw new Error("Update payload is required");

  const existing = await Stakeholder.findById(id);
  if (!existing) throw new Error("Stakeholder not found");

  if (creatorId && existing.createdBy?.toString() !== creatorId.toString())
    throw new Error("Unauthorized: You can only update your own Stakeholder");

  return await Stakeholder.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-__v");
};

export const deleteStakeholder = async (id) => {
  const deleted = await Stakeholder.findByIdAndDelete(id);
  if (!deleted) throw new Error("Stakeholder not found");
  return true;
};