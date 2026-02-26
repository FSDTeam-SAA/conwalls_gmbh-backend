import express from "express";
import { 
    createStakeholderController, 
    deleteStakeholderController, 
    getSingleStakeholderController, 
    getStakeholdersByProjectController, 
    updateStakeholderController
 } from "./stackholder.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";

const router = express.Router();

router.post('/:insightEngineId', verifyToken, createStakeholderController);
router.get('/:insightEngineId', verifyToken, getStakeholdersByProjectController);
router.get('/single/:stakeholderId', verifyToken, getSingleStakeholderController);
router.put('/single/:stakeholderId', verifyToken, updateStakeholderController);
router.delete('/single/:stakeholderId', verifyToken, deleteStakeholderController);

export const stakeholderRouter = router;