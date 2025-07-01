import * as verificationModel from "../models/userVerification.model.js";
import CustomError from "../utils/customError.js";

// ✅ Create Verification Data
export const createVerificationData = async (verificationData) => {
    try {
        const result = await verificationModel.createUserVerification(verificationData);
        return {
            message: "User verification data created successfully",
            data: result,
        };
    } catch (error) {
        throw new CustomError(
            error.statusCode || 500,
            error.message || "Failed to create verification data",
            error
        );
    }
};

// ✅ Get Verification Data by User ID
export const fetchVerificationByUserId = async (userId) => {
    try {
        const result = await verificationModel.getUserVerificationByUserId(userId);
        if (!result) {
            throw new CustomError(404, "User verification data not found");
        }

        return {
            message: "User verification data fetched successfully",
            data: result,
        };
    } catch (error) {
        throw new CustomError(
            error.statusCode || 500,
            error.message || "Failed to fetch verification data",
            error
        );
    }
};

// ✅ Update Verification Data
export const modifyVerificationData = async (userId, updateData) => {
    try {
        const updated = await verificationModel.updateUserVerification(userId, updateData);
        return {
            message: "User verification data updated successfully",
            data: updated,
        };
    } catch (error) {
        throw new CustomError(
            error.statusCode || 500,
            error.message || "Failed to update verification data",
            error
        );
    }
};

// ✅ Delete Verification Data
export const removeVerificationData = async (userId) => {
    try {
        const result = await verificationModel.deleteUserVerification(userId);
        return {
            message: result.message,
        };
    } catch (error) {
        throw new CustomError(
            error.statusCode || 500,
            error.message || "Failed to delete verification data",
            error
        );
    }
};
