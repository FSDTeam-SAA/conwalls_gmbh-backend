import { generateResponse } from "../../lib/responseFormate.js";
import { registerUserService } from "../auth/auth.service.js";
import { getAllParticipantTrainerBasedService } from "./trainer.service.js";


export const getAllParticipantTrainerBased = async (req, res) => {
  try {
    const trainerId = req.user?._id;
    if (!trainerId) {
      return generateResponse(res, 400, false, "Trainer ID is required", null);
    }
     const { page, limit, search, date } = req.query;
    
     const { items, paginationInfo } = await getAllParticipantTrainerBasedService({  
          page,
          limit,
          search,
          date,
          trainerId,
        });
   

    generateResponse(res, 200, true, "Participant connected to trainer successfully", {
      items,
      paginationInfo,
    });
  } catch (error) {
    generateResponse(res, 500, false, "Failed to connect participant to trainer", null);
    console.error("Error connecting participant to trainer:", error);
  }
};

export const connectTrainerToParticipant = async (req, res, next) => {
  const trainerId = req.user?._id;
  console.log("Trainer ID from request:", trainerId);
    if (!trainerId) {
        return generateResponse(res, 400, false, "Trainer ID is required", null);
    }

    const { name, email, password, language, role } = req.body;
    const data = await registerUserService({ name, email, password, language, trainerId, role });
    generateResponse(res, 201, true, 'Registered user successfully!', data);
}