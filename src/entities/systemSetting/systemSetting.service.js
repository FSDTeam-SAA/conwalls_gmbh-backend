// systemSetting.service.js
import SystemSetting from "./systemSetting.model.js";


export const getSystemSettingService = async ({ page = 1, limit = 10 } = {}) => {
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100); // max 100
  const skip = (pageNum - 1) * limitNum;

  const [items, totalItems] = await Promise.all([
    SystemSetting.find().sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
    SystemSetting.countDocuments()
  ]);

  const totalPages = Math.max(Math.ceil(totalItems / limitNum), 1);

  return {
    items,
    pagination: {
      page: pageNum,
      limit: limitNum,
      totalItems,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  };
};



export const getSystemSettingByIdService = async (id) => {
  return await SystemSetting.findById(id).lean();
};

export const createSystemSettingService = async (payload) => {
  // No single-document restriction anymore
  const created = await SystemSetting.create(payload || {});
  return created.toObject();
};

export const updateSystemSettingService = async (id, payload) => {
  const updated = await SystemSetting.findByIdAndUpdate(
    id,
    { $set: payload || {} },
    { new: true }
  ).lean();

  return updated;
};

export const deleteSystemSettingService = async (id) => {
  return await SystemSetting.findByIdAndDelete(id).lean();
};
