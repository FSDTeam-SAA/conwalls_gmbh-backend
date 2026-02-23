import { createFilter, createPaginationInfo } from "../../lib/pagination.js";
import User from "../auth/auth.model.js";

export const getAllParticipantTrainerBasedService = async ({page = 1, limit = 10, search, date, trainerId }) => {
  console.log("Trainer ID in service:", trainerId);
  const filter = createFilter(search, date);
  filter.createdBy = trainerId;
  const total = await User.countDocuments(filter);

  const items = await User.find(filter)
    .populate("createdBy", "name email")
    .select("-__v")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const paginationInfo = createPaginationInfo(page, limit, total);

  return { items, paginationInfo };
};