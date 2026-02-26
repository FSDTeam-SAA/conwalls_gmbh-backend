// import mongoose from "mongoose";

// const stakeholderSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },

//     roleType: {
//       type: String,
//       // enum: ["OPINION_LEADER", "SUPPORTER", "FOLLOWER", "NEUTRAL", "CRITICS", "REFUSERS"],
//       default: "NEUTRAL",
//     },

//     painPoint: { type: String, default: "", trim: true },
//     benefits: { type: String, default: "", trim: true },

//     triggerEvaluation: {
//       type: String,
//       enum: ["LOW_POINTS", "HIGH_POINTS", ""],
//       default: "",
//     },

//     objectionsConcerns: { type: String, default: "", trim: true },
//     objectionHandling: { type: String, default: "", trim: true },

//     measures: [
//       {
//         category: {
//           type: String,
//           // enum: ["COMMUNICATION", "INVOLVEMENT", "RECOGNITION"],
//           // required: true,
//         },
//         type: {
//           type: String,
//           // enum: [
//           //   "PRESENTATION",
//           //   "NEWSLETTER",
//           //   "TOWNHALL_MEETING",
//           //   "INTRANET_ARTICLE",
//           //   "WORKSHOP",
//           //   "COACHING",
//           //   "LEARNING_PLATFORM",
//           //   "CONVERSATION",
//           //   "QA_SESSION",
//           //   "OTHERS",
//           // ],
//           // required: true,
//         },
//         name: { type: String, required: true, trim: true },
//         startWeeks: { type: Number, default: 0, min: 0 },
//         timing: { type: String, enum: ["PRE", "POST"], default: "PRE" },
//       },
//     ],
//   },
//   { _id: false }
// );

// const insightEngineSchema = new mongoose.Schema(
//   {
//     // Participant starting page
//     participantName: { type: String, required: true, trim: true },
//     organization: { type: String, default: "", trim: true },

//     // Project
//     projectTitle: { type: String, trim: true },
//     kickOffDate: { type: Date, default: null },

//     // System forms
//     systemForms: {
//       vision: { type: String, default: "", trim: true },
//       pastGoodOldDays: { type: String, default: "", trim: true },
//       obstacleProblem: { type: String, default: "", trim: true },
//       riskOfInaction: { type: String, default: "", trim: true },
//       solutionIdea: { type: String, default: "", trim: true },
//     },

//     // Stakeholders + measures
//     stakeholders: { type: [stakeholderSchema], default: [] },

//     // Optional: link with logged-in user (if you have auth)
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
//   },
//   { timestamps: true }
// );

// const InsightEngine = mongoose.model("InsightEngine", insightEngineSchema);
// export default InsightEngine;
import mongoose from "mongoose";

const insightEngineSchema = new mongoose.Schema(
  {
    participantName: { type: String, required: true, trim: true },
    organization:   { type: String, default: "", trim: true },
    projectTitle:   { type: String, trim: true },
    kickOffDate:    { type: Date, default: null },
    systemForms: {
      vision:           { type: String, default: "", trim: true },
      pastGoodOldDays:  { type: String, default: "", trim: true },
      obstacleProblem:  { type: String, default: "", trim: true },
      riskOfInaction:   { type: String, default: "", trim: true },
      solutionIdea:     { type: String, default: "", trim: true },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const InsightEngine = mongoose.model("InsightEngine", insightEngineSchema);
export default InsightEngine;