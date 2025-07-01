import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../../config/aws.js";
import CustomError from "../../utils/customError.js";

const TableName = process.env.DYNAMODB_JOIN_CONTEST_TABLE;

/**
 * Join a contest (Create a new entry)
 * @param {Object} joinContestData - Contest join details
 */
export const joinContest = async (joinContestData) => {
    try {
        const params = {
            TableName,
            Item: joinContestData,
            ConditionExpression: "attribute_not_exists(contest_id) AND attribute_not_exists(user_id)", // Prevent duplicate joins
        };
        await dynamoClient.send(new PutCommand(params));
        return joinContestData;
    } catch (error) {
        throw new CustomError(503, "Failed to join contest", error);
    }
};

/**
 * Get a specific contest join entry by contest_id and user_id
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 */
export const getJoinedContest = async (contestId, userId) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId, user_id: userId },
        };
        const result = await dynamoClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        throw new CustomError(503, "Failed to fetch contest join details", error);
    }
};

/**
 * Get all users who joined a specific contest
 * @param {string} contestId - Contest ID
 */
export const getUsersByContest = async (contestId) => {
    try {
        const params = {
            TableName,
            KeyConditionExpression: "contest_id = :contest_id",
            ExpressionAttributeValues: {
                ":contest_id": contestId,
            },
        };
        const result = await dynamoClient.send(new QueryCommand(params));
        return result.Items || [];
    } catch (error) {
        throw new CustomError(503, "Failed to fetch users for the contest", error);
    }
};

/**
 * Get all contests a user has joined
 * @param {string} userId - User ID
 */
export const getContestsByUser = async (userId) => {
    try {
        const params = {
            TableName,
            IndexName: "user_id-index", // Requires a GSI on user_id if querying by user_id
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": userId,
            },
        };
        const result = await dynamoClient.send(new QueryCommand(params));
        return result.Items || [];
    } catch (error) {
        throw new CustomError(503, "Failed to fetch contests joined by user", error);
    }
};

/**
 * Update contest join details (e.g., squad members, payment status, room details)
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 */
export const updateJoinedContest = async (contestId, userId, updates) => {
    try {
        let updateExpression = "SET updatedAt = :updatedAt";
        let expressionAttributeValues = {
            ":updatedAt": new Date().toISOString(),
        };

        Object.keys(updates).forEach((key) => {
            updateExpression += `, ${key} = :${key}`;
            expressionAttributeValues[`:${key}`] = updates[key];
        });

        const params = {
            TableName,
            Key: { contest_id: contestId, user_id: userId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;
    } catch (error) {
        throw new CustomError(503, "Failed to update contest join details", error);
    }
};

/**
 * Remove a user's entry from a contest
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 */
export const leaveContest = async (contestId, userId) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId, user_id: userId },
        };
        await dynamoClient.send(new DeleteCommand(params));
        return { message: "User removed from contest successfully" };
    } catch (error) {
        throw new CustomError(503, "Failed to leave contest", error);
    }
};


/**
 * Update squad members (IGNs & game IDs) – Users can edit only their squad members, not their default game ID.
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 * @param {Array} squadMembers - Array of squad members (IGNs & game IDs)
 */
export const updateSquadMembers = async (contestId, userId, squadMembers) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId, user_id: userId },
            UpdateExpression: "SET squad_members = :squadMembers, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":squadMembers": squadMembers,
                ":updatedAt": new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
        };
        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;
    } catch (error) {
        throw new CustomError(503, "Failed to update squad members", error);
    }
};

/**
 * Update room details (room ID, room password, assigned slot) – Only admins can update this.
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID (Checked in service layer)
 * @param {Object} updates - { room_id, room_password, assigned_slot }
 */
export const updateRoomDetails = async (contestId, updates) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId },
            UpdateExpression: "SET room_id = :roomId, room_password = :roomPassword, assigned_slot = :assignedSlot, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":roomId": updates.room_id,
                ":roomPassword": updates.room_password,
                ":assignedSlot": updates.assigned_slot,
                ":updatedAt": new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
        };
        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;
    } catch (error) {
        throw new CustomError(503, "Failed to update room details", error);
    }
};

/**
 * Update game status, score, rank, and reward – Only admins can update this.
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID (Checked in service layer)
 * @param {Object} updates - { game_status, score, rank, reward }
 */
export const updateGameResults = async (contestId, updates) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId },
            UpdateExpression: "SET game_status = :gameStatus, score = :score, rank = :rank, reward = :reward, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":gameStatus": updates.game_status,
                ":score": updates.score,
                ":rank": updates.rank,
                ":reward": updates.reward,
                ":updatedAt": new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
        };
        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;
    } catch (error) {
        throw new CustomError(503, "Failed to update game results", error);
    }
};
