import Measure from "./measure.model.js";
import SystemSetting from "../systemSetting/systemSetting.model.js";

const buildLabelMap = (items = []) => {
  const map = new Map();

  items.forEach((item) => {
    if (!item?.name) return;

    map.set(item.name, {
      de: item?.labels?.de || "",
      en: item?.labels?.en || item?.name || "",
    });
  });

  return map;
};

const getMeasureLocalizationMaps = async () => {
  const systemSetting = await SystemSetting.findOne().lean();

  if (!systemSetting) {
    return {
      categoryLabelMap: new Map(),
      typeLabelMap: new Map(),
    };
  }

  const categoryTypes = Array.isArray(systemSetting.categoryTypes)
    ? systemSetting.categoryTypes
    : [];

  const categoryLabelMap = buildLabelMap(categoryTypes);
  const typeLabelMap = buildLabelMap(
    categoryTypes.flatMap((category) =>
      Array.isArray(category?.measureTypes) ? category.measureTypes : []
    )
  );

  return { categoryLabelMap, typeLabelMap };
};

const enrichMeasure = (measure, { categoryLabelMap, typeLabelMap }) => {
  const rawMeasure =
    typeof measure?.toObject === "function" ? measure.toObject() : measure;

  const categoryLabels = categoryLabelMap.get(rawMeasure?.category) || {
    de: "",
    en: rawMeasure?.category || "",
  };

  const typeLabels = typeLabelMap.get(rawMeasure?.type) || {
    de: "",
    en: rawMeasure?.type || "",
  };

  return {
    ...rawMeasure,
    categoryLabels,
    typeLabels,
  };
};

export const createMeasure = async ({ stakeholderId, insightEngineId, payload, createdBy }) => {
  const created = await Measure.create({ stakeholderId, insightEngineId, createdBy, ...payload });
  const localizationMaps = await getMeasureLocalizationMaps();

  return enrichMeasure(created, localizationMaps);
};

export const getMeasuresByStakeholder = async (stakeholderId) => {
  const [measures, localizationMaps] = await Promise.all([
    Measure.find({ stakeholderId }).select("-__v").sort({ createdAt: 1 }).lean(),
    getMeasureLocalizationMaps(),
  ]);

  return measures.map((measure) => enrichMeasure(measure, localizationMaps));
};

export const getMeasureById = async (id) => {
  const item = await Measure.findById(id).select("-__v");
  if (!item) throw new Error("Measure not found");

  const localizationMaps = await getMeasureLocalizationMaps();
  return enrichMeasure(item, localizationMaps);
};

export const updateMeasure = async ({ id, payload, creatorId }) => {
  if (!payload || Object.keys(payload).length === 0)
    throw new Error("Update payload is required");

  const existing = await Measure.findById(id);
  if (!existing) throw new Error("Measure not found");

  if (creatorId && existing.createdBy?.toString() !== creatorId.toString())
    throw new Error("Unauthorized: You can only update your own Measure");

  const updated = await Measure.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-__v");

  const localizationMaps = await getMeasureLocalizationMaps();
  return enrichMeasure(updated, localizationMaps);
};

export const deleteMeasure = async (id) => {
  const deleted = await Measure.findByIdAndDelete(id);
  if (!deleted) throw new Error("Measure not found");
  return true;
};
