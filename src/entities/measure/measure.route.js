import express from "express";
import { 
    createMeasureController, 
    deleteMeasureController, 
    getMeasuresByStakeholderController, 
    getSingleMeasureController, 
    updateMeasureController
 } from "./measure.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";
const router = express.Router();


router.post('/:insightEngineId/stakeholders/:stakeholderId', verifyToken, createMeasureController);
router.get('/:insightEngineId/stakeholders/:stakeholderId', verifyToken, getMeasuresByStakeholderController);
router.get('/:measureId', verifyToken, getSingleMeasureController);
router.put('/:measureId', verifyToken, updateMeasureController);
router.delete('/:measureId', verifyToken, deleteMeasureController);

export const measureRouter = router;

// POST   /api/insight-engine/:insightEngineId/stakeholders/:stakeholderId/measures   → create measure
// GET    /api/insight-engine/stakeholders/:stakeholderId/measures                    → list measures
// GET    /api/insight-engine/measures/:id                                            → single measure
// PUT    /api/insight-engine/measures/:id                                            → update measure
// DELETE /api/insight-engine/measures/:id                                            → delete measure