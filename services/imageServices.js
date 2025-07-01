import {
    getUserProfileUploadUrl,
    getContestUploadUrl,
    getGameProfileUploadUrl,
    deleteUserProfilePicture,
    deleteContestPicture,
    deleteGameProfilePicture,
    getUserProfileUrl,
    getContestUrl,
    getGameProfileUrl,
} from "../utils/s3ImageHandler.js";

import CustomError from "../utils/customError.js";

// ✅ Generate Upload URL for User Profile Picture
export const generateUserProfileUploadService = async (userId, fileType, fileSize) => {
    try {
        return await getUserProfileUploadUrl(userId, fileType, fileSize);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to generate user profile upload URL");
    }
};

// ✅ Generate Upload URL for Contest Picture
export const generateContestUploadService = async (contestId, fileType, fileSize) => {
    try {
        return await getContestUploadUrl(contestId, fileType, fileSize);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to generate contest upload URL");
    }
};

// ✅ Generate Upload URL for Game Profile Picture
export const generateGameProfileUploadService = async (userId, fileType, fileSize) => {
    try {
        return await getGameProfileUploadUrl(userId, fileType, fileSize);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to generate game profile upload URL");
    }
};

// ✅ Delete User Profile Picture
export const deleteUserProfileImageService = async (imageUrl) => {
    try {
        return await deleteUserProfilePicture(imageUrl);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to delete user profile image");
    }
};

// ✅ Delete Contest Picture
export const deleteContestImageService = async (imageUrl) => {
    try {
        return await deleteContestPicture(imageUrl);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to delete contest image");
    }
};

// ✅ Delete Game Profile Picture
export const deleteGameProfileImageService = async (imageUrl) => {
    try {
        return await deleteGameProfilePicture(imageUrl);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to delete game profile image");
    }
};

// ✅ Get User Profile Image URL
export const getUserProfileImageService = async (userId) => {
    try {
        return await getUserProfileUrl(userId);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to fetch user profile image URL");
    }
};

// ✅ Get Contest Image URL
export const getContestImageService = async (contestId) => {
    try {
        return await getContestUrl(contestId);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to fetch contest image URL");
    }
};

// ✅ Get Game Profile Image URL
export const getGameProfileImageService = async (userId) => {
    try {
        return await getGameProfileUrl(userId);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Failed to fetch game profile image URL");
    }
};
