import mongoose from "mongoose";

const measureSchema = new mongoose.Schema(
  {
    stakeholderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stakeholder",
      required: true,
    },
    insightEngineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InsightEngine",
      required: true,
    },
    category: {
      type: String,
      // enum: ["COMMUNICATION", "INVOLVEMENT", "RECOGNITION"],
    },
    type: {
      type: String,
      // enum: ["PRESENTATION", "NEWSLETTER", "TOWNHALL_MEETING", "INTRANET_ARTICLE",
      //        "WORKSHOP", "COACHING", "LEARNING_PLATFORM", "CONVERSATION",
      //        "QA_SESSION", "OTHERS"],
    },
    name:       { type: String, required: true, trim: true }, // "subject" in UI
    startWeeks: { type: Number, default: 0, min: 0 },
    timing:     { type: String, enum: ["pre", "post"], default: "pre" },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const Measure = mongoose.model("Measure", measureSchema);
export default Measure;