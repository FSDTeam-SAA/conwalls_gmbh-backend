import express from "express";
import { connectTrainerToParticipant, getAllParticipantTrainerBased } from "./trainer.controller.js";
import { verifyToken } from "../../core/middlewares/authMiddleware.js";


const router = express.Router();

router.post('/connect-participant', verifyToken, connectTrainerToParticipant);
router.get('/participants',verifyToken, getAllParticipantTrainerBased);


export const TrainerRouter = router;


