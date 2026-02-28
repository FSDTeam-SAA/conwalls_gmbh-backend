import { generateResponse } from "../../lib/responseFormate.js";
import User from "../auth/auth.model.js";
import { registerUserService } from "../auth/auth.service.js";
import { getParticipantOwnProjectsListService } from "../session/session.service.js";
import { getAllParticipantTrainerBasedService, updateTrainerFromParticipantService } from "./trainer.service.js";


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

export const getAllInsightEngineByUser = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    console.log("Participant ID from request:", participantId);

    if (!participantId) {
      return generateResponse(res, 400, false, "Participant ID is required", null);
    }

    const { page, limit, search, date } = req.query;

    const { items, paginationInfo } =
      await getParticipantOwnProjectsListService({
        page,
        limit,
        search,
        date,
        participantId,
      });

    generateResponse(
      res,
      200,
      true,
      "Insight projects fetched successfully",
      { items, paginationInfo }
    );
  } catch (error) {
    console.error("Error fetching insight projects:", error);
    generateResponse(
      res,
      500,
      false,
      "Failed to fetch insight projects",
      null
    );
  }
};
export const removeTrainerFromParticipant = async (req, res) => {
  try {
    const trainerId = req.user?._id;
    const participantId = req.body.participantId;
    if (!trainerId) {
      return generateResponse(res, 400, false, "Trainer ID is required", null);
    }
    if (!participantId) {
      return generateResponse(res, 400, false, "Participant ID is required", null);
    }

    const result = await User.findById(participantId);
    if (!result) {
      return generateResponse(res, 404, false, "Participant not found", null);
    }
    result.createdBy = null;
    await result.save();
    generateResponse(res, 200, true, "Trainer removed from participant successfully", result);
  } catch (error) {
    console.error("Error removing trainer from participant:", error);
    generateResponse(res, 500, false, "Failed to remove trainer from participant", null);
  }
};
export const updateTrainerFromParticipant = async (req, res) => {
  try {
    const trainerId = req.user?._id;
    const participantId = req.body.participantId;

    if (!trainerId) {
      return generateResponse(res, 400, false, "Trainer ID is required", null);
    }
    if (!participantId) {
      return generateResponse(res, 400, false, "Participant ID is required", null);
    }

    const participant = await updateTrainerFromParticipantService({ 
      trainerId, 
      participantId, 
      data: req.body 
    });

    if (!participant) {
      return generateResponse(res, 404, false, "Participant not found", null);
    }

    generateResponse(res, 200, true, "Trainer updated for participant successfully", participant);
  } catch (error) {
    console.error("Error updating trainer from participant:", error);
    generateResponse(res, 500, false, "Failed to update trainer from participant", null);
  }
};

export const getParticipantIdBased = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    if (!participantId) {
      return generateResponse(res, 400, false, "Participant ID is required", null);
    }
    const participant = await User.findById(participantId).select("-password -__v");
    if (!participant) {
      return generateResponse(res, 404, false, "Participant not found", null);
    }
    generateResponse(res, 200, true, "Participant fetched successfully", participant);
  } catch (error) {
    console.error("Error fetching participant:", error);
    generateResponse(res, 500, false, "Failed to fetch participant", null);
  }
};