import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../../config/aws.js";
import CustomError from "../../utils/customError.js";


const TableName = process.env.DYNAMODB_CONTESTS_TABLE

export const createContest = async (contestData) => {
    try {
        const params = {
            TableName,
            Item: contestData,
        };
        const contestRecord = await dynamoClient.send(new PutCommand(params));
        return contestRecord;
    } catch (error) {
        throw new CustomError(501, " Error in model, Contest cant create");
    }

};

export const getContestById = async (contestId) => {
    try {
        const params = {
            TableName,
            Key: { contestId: contestId }
        };
        const result = await dynamoClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        throw new CustomError(501, "Error in model, Contest cant featched");
    }

};

export const getAllContests = async () => {
    try {
        const params = { TableName };
        const result = await dynamoClient.send(new ScanCommand(params));
        return result.Items;
    } catch (error) {
        throw new CustomError(501, "Error in model, All contest cant get");
    }
};

export const updateContest = async (contestId, updateData) => {
    try {
        const updateExpression = "set " + Object.keys(updateData).map((key) => `${key} = :${key}`).join(", ");
        const expressionAttributeValues = Object.fromEntries(Object.entries(updateData).map(([key, value]) => [`:${key}`, value]));

        const params = {
            TableName,
            Key: { contestId: contestId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoClient.send(new UpdateCommand(params));
        return result.Attributes;

    } catch (error) {
        throw new CustomError(501, "Error in model, Contest cant modified");
    }
};

// delete contest
export const deleteContest = async (contestId) => {
    if (!contestId || typeof contestId !== "string") {
        throw new CustomError(400, "Invalid contest ID provided.");
    }

    try {
        const params = {
            TableName,
            Key: { contestId: contestId },
            ReturnValues: "ALL_OLD"
        };

        const result = await dynamoClient.send(new DeleteCommand(params));

        // Optionally, check if the item was deleted
        if (result?.Attributes) {
            return { message: "Contest deleted successfully", deletedItem: result.Attributes };
        } else {
            return { message: "Contest deleted successfully but did not get the item" };
        }
    } catch (error) {
        console.error("DynamoDB Delete Error:", error);
        throw new CustomError(500, `Error deleting contest: ${error.message}`);
    }
};



// ✅ Fetch contests by Game Name (Using GameIndex)
export const getContestsByGame = async (gameName) => {
    try {
        const params = {
            TableName,
            FilterExpression: "game_name = :gameName",
            ExpressionAttributeValues: {
                ":gameName": gameName,
            },
        };

        const result = await dynamoClient.send(new ScanCommand(params));

        if (!result.Items || result.Items.length === 0) {
            throw new CustomError(404, `No contests found for game: ${gameName}`);
        }

        return result.Items;
    } catch (error) {
        throw new CustomError(501, "Error in model, Contests can't be fetched by game name");
    }
};



/**
 * Fetch contests by Game Name using GSI
 * @param {string} gameName - Name of the game
 */
export const getContestsByGameGSI = async (gameName) => {
    try {
        const params = {
            TableName,
            IndexName: "GameIndex", // GSI on game_name
            KeyConditionExpression: "game_name = :gameName",
            ExpressionAttributeValues: {
                ":gameName": gameName,
            },
        };

        const result = await dynamoClient.send(new QueryCommand(params));

        if (!result.Items || result.Items.length === 0) {
            throw new CustomError(404, `No contests found for game: ${gameName}`);
        }

        return result.Items;
    } catch (error) {
        throw new CustomError(501, "Error fetching contests by game name", error);
    }
};
