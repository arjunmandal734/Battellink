import { PutCommand, GetCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import {dynamoClient} from "../../config/aws.js";
import CustomError from "../../utils/customError.js";

const TableName = process.env.DYNAMODB_CONTEST_RESULTS_TABLE;

/**
 * Save contest results after completion.
 * @param {Object} resultData - Contest result details.
 */
export const saveContestResult = async (resultData) => {
    try {
        const params = {
            TableName,
            Item: resultData,
        };
        await dynamoClient.send(new PutCommand(params));
        return resultData;
    } catch (error) {
        throw new CustomError(503, "Failed to save contest result", error);
    }
};

/**
 * Get contest results by contest ID.
 * @param {string} contestId - Contest ID.
 */
export const getContestResults = async (contestId) => {
    try {
        const params = {
            TableName,
            KeyConditionExpression: "contest_id = :contest_id",
            ExpressionAttributeValues: { ":contest_id": contestId },
        };
        const result = await dynamoClient.send(new QueryCommand(params));
        return result.Items || [];
    } catch (error) {
        throw new CustomError(503, "Failed to fetch contest results", error);
    }
};

/**
 * Delete contest results when needed.
 * @param {string} contestId - Contest ID.
 */
export const deleteContestResult = async (contestId) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId },
        };
        await dynamoClient.send(new DeleteCommand(params));
        return { message: "Contest result deleted successfully" };
    } catch (error) {
        throw new CustomError(503, "Failed to delete contest result", error);
    }
};
