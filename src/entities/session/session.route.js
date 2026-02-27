import express from "express";
import {
  submitInsightEngineController,
  getAllInsightEngineController,
  getSingleInsightEngineController,
  updateInsightEngineController,
  deleteInsightEngineController,
  getParticipantOwnProjectsList,
  getStakeholdersAndMeasuresController
} from "./session.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";


const router = express.Router();

router.post("/submit", verifyToken, submitInsightEngineController);
router.get("/",  getAllInsightEngineController);
router.get("/participant/projects", verifyToken, getParticipantOwnProjectsList);
router.get("/stakeholders-measures/:insightEngineId", verifyToken, getStakeholdersAndMeasuresController);
router.get("/:id",  getSingleInsightEngineController);
router.put("/:id",  updateInsightEngineController);
router.delete("/:id",  deleteInsightEngineController);

export const sessionRouter = router;
