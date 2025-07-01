import { PutCommand, GetCommand, UpdateCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../../config/aws.js";
import CustomError from "../../utils/customError.js";

const TableName = process.env.DYNAMODB_PAYMENT_TABLE;

/**
 * Save payment details in the table
 * @param {Object} paymentData - Payment details
 */
export const savePayment = async (paymentData) => {
    try {
        const params = {
            TableName,
            Item: {
                ...paymentData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        };
        await dynamoClient.send(new PutCommand(params));
        return paymentData;
    } catch (error) {
        throw new CustomError(503, "Failed to save payment", error);
    }
};


/**
 * Get payment details by payment ID
 * @param {string} paymentId - Unique Payment ID
 */
export const getPaymentById = async (paymentId) => {
    try {
        const params = {
            TableName,
            Key: { payment_id: paymentId },
        };
        const result = await dynamoClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        throw new CustomError(503, "Failed to fetch payment details", error);
    }
};


/**
 * Get all payments made by a user
 * @param {string} userId - User ID
 */
export const getPaymentsByUser = async (userId) => {
    try {
        const params = {
            TableName,
            IndexName: "user_id-index", // Requires a GSI on user_id
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: { ":user_id": userId },
        };
        const result = await dynamoClient.send(new QueryCommand(params));
        return result.Items || [];
    } catch (error) {
        throw new CustomError(503, "Failed to fetch payments for user", error);
    }
};


/**
 * Update payment status (Pending ➝ Completed / Failed)
 * @param {string} paymentId - Payment ID
 * @param {string} status - New status (Completed, Failed)
 */
export const updatePaymentStatus = async (paymentId, status) => {
    try {
        const params = {
            TableName,
            Key: { payment_id: paymentId },
            UpdateExpression: "SET status = :status, updated_at = :updatedAt",
            ExpressionAttributeValues: {
                ":status": status,
                ":updatedAt": new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
        };
        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;
    } catch (error) {
        throw new CustomError(503, "Failed to update payment status", error);
    }
};


/**
 * Get all payments for a specific contest
 * @param {string} contestId - Contest ID
 */
export const getPaymentsByContest = async (contestId) => {
    try {
        const params = {
            TableName,
            IndexName: "contest_id-index", // Requires a GSI on contest_id
            KeyConditionExpression: "contest_id = :contest_id",
            ExpressionAttributeValues: { ":contest_id": contestId },
        };
        const result = await dynamoClient.send(new QueryCommand(params));
        return result.Items || [];
    } catch (error) {
        throw new CustomError(503, "Failed to fetch payments for contest", error);
    }
};


/**
 * Delete a payment record (Only for failed payments)
 * @param {string} paymentId - Payment ID
 */
export const deletePayment = async (paymentId) => {
    try {
        const params = {
            TableName,
            Key: { payment_id: paymentId },
            ConditionExpression: "status = :failed",
            ExpressionAttributeValues: { ":failed": "Failed" },
        };
        await dynamoClient.send(new DeleteCommand(params));
        return { message: "Payment record deleted successfully" };
    } catch (error) {
        throw new CustomError(503, "Failed to delete payment record", error);
    }
};
