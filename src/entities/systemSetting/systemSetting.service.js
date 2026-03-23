// systemSetting.service.js
import SystemSetting from "./systemSetting.model.js";

const normalizeMeasureType = (item = {}) => ({
  name: item?.name || "",
  labels: {
    de: item?.labels?.de || "",
    en: item?.labels?.en || ""
  },
  values: {
    de: item?.values?.de || "",
    en: item?.values?.en || ""
  }
});

const normalizeCategoryType = (item = {}) => ({
  name: item?.name || "",
  labels: {
    de: item?.labels?.de || "",
    en: item?.labels?.en || ""
  },
  measureTypes: Array.isArray(item?.measureTypes)
    ? item.measureTypes.map(normalizeMeasureType).filter((measure) => measure.name)
    : []
});

const flattenMeasureTypesFromCategories = (categories = [], fallback = []) => {
  const categoryMeasures = categories.flatMap((category) =>
    Array.isArray(category?.measureTypes) ? category.measureTypes : []
  );

  const source = categoryMeasures.length ? categoryMeasures : fallback;
  const unique = new Map();

  source.forEach((item) => {
    if (!item?.name) return;
    unique.set(item.name, normalizeMeasureType(item));
  });

  return Array.from(unique.values());
};

const normalizeSystemSetting = (item = {}) => {
  const categoryTypes = Array.isArray(item?.categoryTypes)
    ? item.categoryTypes.map(normalizeCategoryType).filter((category) => category.name)
    : [];

  return {
    ...item,
    categoryTypes,
    measureTypes: flattenMeasureTypesFromCategories(categoryTypes, item?.measureTypes || [])
  };
};

const normalizePayload = (payload = {}) => {
  const normalizedPayload = { ...payload };

  if (Array.isArray(payload?.categoryTypes)) {
    const categoryTypes = payload.categoryTypes
      .map(normalizeCategoryType)
      .filter((category) => category.name);

    normalizedPayload.categoryTypes = categoryTypes;
    normalizedPayload.measureTypes = flattenMeasureTypesFromCategories(
      categoryTypes,
      Array.isArray(payload?.measureTypes) ? payload.measureTypes : []
    );
  } else if (Array.isArray(payload?.measureTypes)) {
    normalizedPayload.measureTypes = payload.measureTypes
      .map(normalizeMeasureType)
      .filter((measure) => measure.name);
  }

  return normalizedPayload;
};

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
    items: items.map(normalizeSystemSetting),
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
  const item = await SystemSetting.findById(id).lean();
  return item ? normalizeSystemSetting(item) : null;
};

export const createSystemSettingService = async (payload) => {
  // No single-document restriction anymore
  const created = await SystemSetting.create(normalizePayload(payload || {}));
  return normalizeSystemSetting(created.toObject());
};

export const updateSystemSettingService = async (id, payload) => {
  const updated = await SystemSetting.findByIdAndUpdate(
    id,
    { $set: normalizePayload(payload || {}) },
    { new: true }
  ).lean();

  return updated ? normalizeSystemSetting(updated) : null;
};

export const deleteSystemSettingService = async (id) => {
  return await SystemSetting.findByIdAndDelete(id).lean();
};
