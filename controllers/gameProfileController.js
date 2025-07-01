import * as gameProfileService from "../services/gameProfileService.js";
import { validateGameProfileInput } from "../validations/gameProfileInputDataValidation.js";
import CustomError from "../utils/customError.js";

/**
 * Controller to add a new game profile for a user
 */
export const createGameProfileController = async (req, res, next) => {
    try {
        const { error } = validateGameProfileInput(req.body);
        if (error) {
            throw new CustomError(400, error.details[0].message);
        }

        const newGameProfile = await gameProfileService.addGameProfile(req.body);
        return res.status(201).json({
            success: true,
            message: "Game profile added successfully.",
            data: newGameProfile
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Controller to get a single game profile by user ID and game name
 */
export const getUserGameProfileController = async (req, res, next) => {
    try {
        const { userId, gameName } = req.params;

        if(!userId || !gameName){
            throw new CustomError(404, "User id and game name id needed");
        }

        const gameProfile = await gameProfileService.getGameProfile(userId, gameName);
        return res.status(200).json({
            success: true,
            data: gameProfile
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Controller to get all game profiles for a user
 */
export const getAllUserGameProfilesController = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new CustomError(404, "User id needed");
        }
        const gameProfiles = await gameProfileService.getAllGameProfiles(userId);
        return res.status(200).json({
            success: true,
            data: gameProfiles
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Controller to update an existing game profile
 */
export const updateGameProfileController = async (req, res, next) => {
    try {
        const { error } = validateGameProfileInput(req.body);
        if (error) {
            throw new CustomError(400, error.details[0].message);
        }

        const { userId, gameName } = req.params;

        if (!userId || !gameName) {
            throw new CustomError(404, "User id and game name id needed");
        }
        const updatedGameProfile = await gameProfileService.updateGameProfile(userId, gameName, req.body);

        return res.status(200).json({
            success: true,
            message: "Game profile updated successfully.",
            data: updatedGameProfile
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Controller to delete a game profile
 */
export const deleteGameProfileController = async (req, res, next) => {
    try {
        const { userId, gameName } = req.params;
        if (!userId || !gameName) {
            throw new CustomError(404, "User id and game name id needed");
        }

        await gameProfileService.deleteGameProfile(userId, gameName);
        return res.status(200).json({
            success: true,
            message: "Game profile deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};
