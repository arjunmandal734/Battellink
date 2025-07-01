import { PutCommand, GetCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import {dynamoClient} from "../../config/aws.js";
import CustomError from "../../utils/customError.js";

const TableName = process.env.DYNAMODB_CONTEST_ROOMS_TABLE;

/**
 * Add or update room details for a specific contest and group.
 * @param {Object} roomData - { contest_id, group_number, room_id, room_password }
 */
export const upsertContestRoom = async (roomData) => {
    try {
        const params = {
            TableName,
            Item: {
                ...roomData,
                updatedAt: new Date().toISOString(),
            },
        };
        await dynamoClient.send(new PutCommand(params));
        return roomData;
    } catch (error) {
        throw new CustomError(503, "Failed to add/update contest room", error);
    }
};


/**
 * Fetch room details for a specific contest and group.
 * @param {string} contestId - Contest ID
 * @param {number} groupNumber - Group number
 */
export const getContestRoom = async (contestId, groupNumber) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId, group_number: groupNumber },
        };
        const result = await dynamoClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        throw new CustomError(503, "Failed to fetch contest room details", error);
    }
};


/**
 * Fetch all groups and room details for a contest.
 * @param {string} contestId - Contest ID
 */
export const getAllRoomsForContest = async (contestId) => {
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
        throw new CustomError(503, "Failed to fetch all rooms for the contest", error);
    }
};



export const updateRoomDetails = async (contestId, groupNumber, newRoomId, newRoomPassword) => {
    try {
        const params = {
            TableName,
            Key: { contest_id: contestId, group_number: groupNumber },
            UpdateExpression: "SET room_id = :roomId, room_password = :roomPassword, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":roomId": newRoomId,
                ":roomPassword": newRoomPassword,
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


// Delete all records of a contest id ------>>>>

export const deleteContestRecords = async (contestId) => {
    try {
        // Query to get all groups under this contest_id
        const queryParams = {
            TableName,
            KeyConditionExpression: "contest_id = :contestId",
            ExpressionAttributeValues: {
                ":contestId": contestId,
            },
        };

        const queryResult = await dynamoClient.send(new QueryCommand(queryParams));

        if (!queryResult.Items || queryResult.Items.length === 0) {
            throw new CustomError(404, "No records found for the given contest ID");
        }

        // Batch delete all records for this contest_id
        const deleteRequests = queryResult.Items.map((item) => ({
            DeleteRequest: {
                Key: {
                    contest_id: item.contest_id,
                    group_number: item.group_number, // Since group_number is part of the primary key
                },
            },
        }));

        const batchDeleteParams = {
            RequestItems: {
                [TableName]: deleteRequests,
            },
        };

        await dynamoClient.send(new BatchWriteCommand(batchDeleteParams));

        return { message: "All records for the contest deleted successfully" };
    } catch (error) {
        throw new CustomError(503, "Failed to delete contest records", error);
    }
};
