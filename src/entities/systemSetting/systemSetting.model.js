import mongoose from "mongoose";

const NameOnlySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const NameLangValuesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    values: {
      de: { type: String, default: "" },
      en: { type: String, default: "" }
    }
  },
  { _id: false }
);

const SystemSettingSchema = new mongoose.Schema(
  {
    helpTexts: { type: [NameLangValuesSchema], default: [] },
    roleTypes: { type: [NameOnlySchema], default: [] },
    categoryTypes: { type: [NameOnlySchema], default: [] },
    measureTypes: { type: [NameLangValuesSchema], default: [] },
    triggerAiPrompt: { type: [NameLangValuesSchema], default: [] }
  },
  { timestamps: true }
);

const SystemSetting = mongoose.model("SystemSetting", SystemSettingSchema);

export default SystemSetting;
