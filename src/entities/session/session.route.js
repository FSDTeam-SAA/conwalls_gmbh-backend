import express from "express";
import {
  submitInsightEngineController,
  getAllInsightEngineController,
  getSingleInsightEngineController,
  updateInsightEngineController,
  deleteInsightEngineController,
} from "./session.controller.js";


const router = express.Router();

router.post("/submit",  submitInsightEngineController);
router.get("/",  getAllInsightEngineController);
router.get("/:id",  getSingleInsightEngineController);
router.put("/:id",  updateInsightEngineController);
router.delete("/:id",  deleteInsightEngineController);

export const sessionRouter = router;
