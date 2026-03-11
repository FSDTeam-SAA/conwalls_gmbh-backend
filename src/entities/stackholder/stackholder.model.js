import mongoose from "mongoose";

const stakeholderSchema = new mongoose.Schema(
  {
    insightEngineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InsightEngine",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    roleType: {
      type: String,
      // enum: ["OPINION_LEADER", "SUPPORTER", "FOLLOWER", "NEUTRAL", "CRITICS", "REFUSERS"],
      default: "NEUTRAL",
    },
    painPoint:           { type: String, default: "", trim: true },
    benefits:            { type: String, default: "", trim: true },
    callToAction:        {type: String, default: "", trim: true},
    triggerEvaluation: {
      type: String,
      enum: ["LOW_POINTS", "HIGH_POINTS", ""],
      default: "",
    },
    objectionsConcerns:  { type: String, default: "", trim: true },
    objectionHandling:   { type: String, default: "", trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const Stakeholder = mongoose.model("Stakeholder", stakeholderSchema);
export default Stakeholder;