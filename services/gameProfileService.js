import * as gameProfileModel from "../models/dynamo/gameProfileModel.js"; // Import model functions
import CustomError from "../utils/customError.js";   // import custom error class


/**
 * Add a new game profile for a user
 * @param {Object} gameProfileData - Game profile details
 */
export const addGameProfile = async (gameProfileData) => {
    try {
        // Check if the game profile already exists
        const existingProfile = await gameProfileModel.getGameProfileByUserAndGame(gameProfileData.user_id, gameProfileData.game_name);
        if (existingProfile) {
            throw new CustomError(400, "Game profile already exists for this user.");
        }

        return await gameProfileModel.addGameProfile(gameProfileData);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Get a game profile by user ID and game name
 * @param {string} userId - User ID
 * @param {string} gameName - Game name (e.g., BGMI, COD, Free Fire)
 */
export const getGameProfile = async (userId, gameName) => {
    try {
        const gameProfile = await gameProfileModel.getGameProfileByUserAndGame(userId, gameName);
        if (!gameProfile) {
            throw new CustomError(404, "Game profile not found.");
        }

        return gameProfile;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Get all game profiles for a user
 * @param {string} userId - User ID
 */
export const getAllGameProfiles = async (userId) => {
    try {
        const gameProfiles = await gameProfileModel.getGameProfilesByUser(userId);
        return gameProfiles || [];
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Update an existing game profile
 * @param {string} userId - User ID
 * @param {string} gameName - Game name
 * @param {Object} updates - Fields to update
 */
export const updateGameProfile = async (userId, gameName, updates) => {
    try {
        const updatedProfile = await gameProfileModel.updateGameProfile(userId, gameName, updates);
        if (!updatedProfile) {
            throw new CustomError(404, "Game profile not found.");
        }

        return updatedProfile;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Delete a game profile for a user
 * @param {string} userId - User ID
 * @param {string} gameName - Game name
 */
export const deleteGameProfile = async (userId, gameName) => {
    try {
        const result = await gameProfileModel.deleteGameProfile(userId, gameName);
        if (!result) {
            throw new CustomError(404, "Game profile not found.");
        }

        return result;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};
