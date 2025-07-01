import * as userProfileService from "../services/userProfileService.js";
import { validateUserInput } from "../validations/userProfileInputDataValidation.js";
import CustomError from "../utils/customError.js";

/**
 * Create a new user profile
 */
export const createUserProfile = async (req, res, next) => {
    try {
        // Validate input data
        const { error } = validateUserInput(req.body);
        if (error) {
            throw new CustomError(400, error.details[0].message);
        }

        const newUser = await userProfileService.createUserProfileService(req.body);
        return res.status(201).json({ success: true, message: "User profile created successfully", data: newUser });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user profile by ID
 */
export const getUserProfileById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId) throw new CustomError(400, "User ID is required.");

        const userProfile = await userProfileService.getUserProfileByIdService(userId);
        return res.status(200).json({ success: true, data: userProfile });
    } catch (error) {
        next(error);
    }
};

/**
 * Get all user profiles
 */
export const getAllUserProfiles = async (req, res, next) => {
    try {
        const users = await userProfileService.getAllUserProfilesService();
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId) throw new CustomError(400, "User ID is required.");

        // Validate update data
        const { error } = validateUserInput(req.body);
        if (error) {
            throw new CustomError(400, error.details[0].message);
        }

        const updatedUser = await userProfileService.updateUserProfileService(userId, req.body);
        return res.status(200).json({ success: true, message: "User profile updated successfully", data: updatedUser });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete user profile
 */
export const deleteUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId) throw new CustomError(400, "User ID is required.");

        const result = await userProfileService.deleteUserProfileService(userId);
        return res.status(200).json({ success: true, message: "User profile deleted successfully" });
    } catch (error) {
        next(error);
    }
};
