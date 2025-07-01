import {
    PutObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import CustomError from "../../utils/customError.js";
import { s3Client } from "@aws-sdk/client-s3";



const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const generatePresignedUrl = async (fileType, folderPath, fileName, fileSize) => {
    try {
        if (!ALLOWED_FILE_TYPES.includes(fileType)) {
            throw new CustomError(400, "Invalid file type. Only PNG & JPG allowed.");
        }

        if (fileSize > MAX_FILE_SIZE) {
            throw new CustomError(400, "File size exceeds 5MB limit.");
        }

        const fileExtension = fileType.split("/")[1];
        const finalFileName = `${folderPath}${fileName}.${fileExtension}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: finalFileName,
            ContentType: fileType,
            ACL: "public-read",
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

        return {
            presignedUrl,
            fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${finalFileName}`,
        };
    } catch (error) {
        throw new CustomError(500, "Error generating pre-signed URL for upload");
    }
};

const fetchImageUrl = async (folderPath, fileName) => {
    try {
        const prefix = `${folderPath}${fileName}`;
        const command = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Prefix: prefix,
        });

        const data = await s3Client.send(command);

        if (!data.Contents || !data.Contents.length) {
            throw new CustomError(404, "Image not found in S3.");
        }

        const latestImageKey = data.Contents[0].Key;
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${latestImageKey}`;
    } catch (error) {
        throw new CustomError(500, "Error fetching image from S3");
    }
};

const deleteImageFromS3 = async (imageUrl) => {
    try {
        const key = imageUrl.split(".amazonaws.com/")[1];

        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        });

        await s3Client.send(command);

        return { message: "Image deleted successfully" };
    } catch (error) {
        throw new CustomError(500, "Error deleting image from S3");
    }
};

// Pre-signed URL endpoints
export const getUserProfileUploadUrl = async (userId, fileType, fileSize) => {
    return await generatePresignedUrl(fileType, "userProfileMedia/profileImages/", userId, fileSize);
};

export const getContestUploadUrl = async (contestId, fileType, fileSize) => {
    return await generatePresignedUrl(fileType, "contestMedia/contestThumbnails/", contestId, fileSize);
};

export const getGameProfileUploadUrl = async (userId, fileType, fileSize) => {
    return await generatePresignedUrl(fileType, "generalMedia/gameProfileImages/", userId, fileSize);
};

// Deletion endpoints
export const deleteUserProfilePicture = async (imageUrl) => {
    return await deleteImageFromS3(imageUrl);
};

export const deleteContestPicture = async (imageUrl) => {
    return await deleteImageFromS3(imageUrl);
};

export const deleteGameProfilePicture = async (imageUrl) => {
    return await deleteImageFromS3(imageUrl);
};

// Fetch endpoints
export const getUserProfileUrl = async (userId) => {
    return await fetchImageUrl("userProfileMedia/profileImages/", userId);
};

export const getContestUrl = async (contestId) => {
    return await fetchImageUrl("contestMedia/contestThumbnails/", contestId);
};

export const getGameProfileUrl = async (userId) => {
    return await fetchImageUrl("generalMedia/gameProfileImages/", userId);
};
