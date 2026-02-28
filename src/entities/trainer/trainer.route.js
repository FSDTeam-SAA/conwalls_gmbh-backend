import express from "express";
import { connectTrainerToParticipant, getAllInsightEngineByUser, getAllParticipantTrainerBased, getParticipantIdBased, removeTrainerFromParticipant, updateTrainerFromParticipant } from "./trainer.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";


const router = express.Router();

router.post('/connect-participant', verifyToken, connectTrainerToParticipant);
router.get('/participants',verifyToken, getAllParticipantTrainerBased);
router.get('/participant-insights/:participantId', getAllInsightEngineByUser);
router.put('/remove-trainer', verifyToken, removeTrainerFromParticipant);
router.put('/update-participant', verifyToken, updateTrainerFromParticipant);
router.get('/participant/:participantId', getParticipantIdBased);


export const TrainerRouter = router;


