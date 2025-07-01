import * as joinContestService from "../services/joinContestService.js";
import { joinContestSchema, updateSquadSchema, updateRoomSchema, updateGameResultsSchema } from "../validations/joinContestInputDataValidation.js";
import CustomError from "../utils/customError.js";

/**
 * Controller to handle user joining a contest.
 */
export const joinContestController = async (req, res, next) => {
    try {
        // Validate request body
        const { error, value } = joinContestSchema.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);

        const result = await joinContestService.joinContestService(value);
        res.status(201).json({ success: true, message: "Joined contest successfully", data: result });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update squad members – Users can edit only their squad members.
 */
export const updateSquadMembersController = async (req, res, next) => {
    try {
        const { contestId, userId } = req.params;

        // Validate squad members
        const { error, value } = updateSquadSchema.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);

        const result = await joinContestService.updateSquadMembersService(contestId, userId, value.squad_members);
        res.status(200).json({ success: true, message: "Squad updated successfully", data: result });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update room details (Admin only).
 */
export const updateRoomDetailsController = async (req, res, next) => {
    try {
        const { contestId } = req.params;

        // Validate room details
        const { error, value } = updateRoomSchema.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);

        const result = await joinContestService.updateRoomDetailsService(contestId, value);
        res.status(200).json({ success: true, message: "Room details updated successfully", data: result });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update game status, score, rank, and reward (Admin only).
 */
export const updateGameResultsController = async (req, res, next) => {
    try {
        const { contestId } = req.params;

        // Validate game results
        const { error, value } = updateGameResultsSchema.validate(req.body);
        if (error) throw new CustomError(400, error.details[0].message);

        const result = await joinContestService.updateGameResultsService(contestId, value);
        res.status(200).json({ success: true, message: "Game results updated successfully", data: result });
    } catch (error) {
        next(error);
    }
};
