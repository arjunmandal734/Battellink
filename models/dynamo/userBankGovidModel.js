import { dynamoClient } from "../config/dynamoConfig.js";
import { PutCommand, GetCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import CustomError from "../utils/CustomError.js";

const TableName = process.env.BANK_GOVERMENT_ID_TABLE; // Unified table for bank & government ID

// ✅ Create User Verification Data
export const createUserVerification = async (verificationData) => {
    try {
        const params = {
            TableName,
            Item: verificationData,
        };
        await dynamoClient.send(new PutCommand(params));
        return verificationData;
    } catch (error) {
        throw new CustomError(501, "Error creating user verification data", error);
    }
};

// ✅ Get Verification Data by User ID
export const getUserVerificationByUserId = async (userId) => {
    try {
        const params = {
            TableName,
            Key: { user_id: userId },
        };
        const result = await dynamoClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        throw new CustomError(501, "Error fetching user verification data", error);
    }
};

// ✅ Update Verification Data
export const updateUserVerification = async (userId, updateData) => {
    try {
        const updateExpression = "set " + Object.keys(updateData).map((key) => `${key} = :${key}`).join(", ");
        const expressionAttributeValues = Object.fromEntries(Object.entries(updateData).map(([key, value]) => [`:${key}`, value]));

        const params = {
            TableName,
            Key: { user_id: userId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;
    } catch (error) {
        throw new CustomError(501, "Error updating user verification data", error);
    }
};

// ✅ Delete Verification Data
export const deleteUserVerification = async (userId) => {
    try {
        const params = {
            TableName,
            Key: { user_id: userId },
        };
        await dynamoClient.send(new DeleteCommand(params));
        return { message: "User verification data deleted successfully" };
    } catch (error) {
        throw new CustomError(501, "Error deleting user verification data", error);
    }
};
