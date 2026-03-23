import mongoose from "mongoose";

const LabelsSchema = new mongoose.Schema(
  {
    de: { type: String, default: "" },
    en: { type: String, default: "" }
  },
  { _id: false }
);

const NameOnlySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    labels: { type: LabelsSchema, default: () => ({}) }
  },
  { _id: false }
);

const NameLangValuesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    labels: { type: LabelsSchema, default: () => ({}) },
    values: {
      de: { type: String, default: "" },
      en: { type: String, default: "" }
    }
  },
  { _id: false }
);

const CategoryTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    labels: { type: LabelsSchema, default: () => ({}) },
    measureTypes: { type: [NameLangValuesSchema], default: [] }
  },
  { _id: false }
);

const SystemSettingSchema = new mongoose.Schema(
  {
    helpTexts: { type: [NameLangValuesSchema], default: [] },
    stakeholderHelpTexts: { type: [NameLangValuesSchema], default: [] },
    roleTypes: { type: [NameOnlySchema], default: [] },
    categoryTypes: { type: [CategoryTypeSchema], default: [] },
    measureTypes: { type: [NameLangValuesSchema], default: [] },
    triggerAiPrompt: { type: [NameLangValuesSchema], default: [] }
  },
  { timestamps: true }
);

const SystemSetting = mongoose.model("SystemSetting", SystemSettingSchema);

export default SystemSetting;
