import {dynamoClient} from "../../config/aws.js";
import { PutCommand, UpdateCommand, DeleteCommand, QueryCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";


const TABLE_NAME = process.env.DYNAMODB_GAME_PROFILES_TABLE;

// ✅ Add Game Profile
export const addGameProfile = async (profileData) => {
    const params = {
        TableName: TABLE_NAME,
        Item: profileData,
    };

    await dynamoClient.send(new PutCommand(params));
    return profileData;
};

// ✅ Get All Game Profiles for a User
export const getGameProfilesByUser = async (user_id) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "user_id = :userId",
        ExpressionAttributeValues: { ":userId": user_id },
    };

    const result = await dynamoClient.send(new QueryCommand(params));
    return result.Items;
};

// ✅ Get Specific Game Profile for a User (By game_name)
export const getGameProfileByUserAndGame = async (user_id, game_name) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "user_id = :userId AND game_name = :gameName",
        ExpressionAttributeValues: {
            ":userId": user_id,
            ":gameName": game_name,
        },
    };

    const result = await dynamoClient.send(new QueryCommand(params));
    return result.Items.length > 0 ? result.Items[0] : null;
};

// ✅ Update Specific Game Profile for a User
export const updateGameProfile = async (user_id, game_name, updatedData) => {
    const updateParams = {
        TableName: TABLE_NAME,
        Key: { user_id, game_name },
        UpdateExpression: "SET stats = :stats, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":stats": updatedData.stats,
            ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
    };

    const result = await dynamoClient.send(new UpdateCommand(updateParams));
    return result.Attributes;
};

// ✅ Delete a Specific Game Profile
export const deleteGameProfile = async (user_id, game_name) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { user_id, game_name },
    };

    await dynamoClient.send(new DeleteCommand(params));
    return { message: "Game profile deleted successfully" };
};


export const deleteAllGameProfiles = async (user_id) => {
    // 1. Query all game profiles by user_id
    const queryParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: {
            ":uid": user_id,
        },
    };

    const result = await dynamoClient.send(new QueryCommand(queryParams));
    const items = result.Items || [];

    if (items.length === 0) {
        return { message: "No game profiles found for this user." };
    }

    // 2. Prepare delete requests (max 25 per batch)
    const batches = [];
    for (let i = 0; i < items.length; i += 25) {
        const batch = items.slice(i, i + 25).map((item) => ({
            DeleteRequest: {
                Key: {
                    user_id: item.user_id,
                    game_name: item.game_name,
                },
            },
        }));
        batches.push(batch);
    }

    // 3. Execute each batch delete
    for (const batch of batches) {
        const deleteParams = {
            RequestItems: {
                [TABLE_NAME]: batch,
            },
        };
        await dynamoClient.send(new BatchWriteCommand(deleteParams));
    }

    return { message: "All game profiles deleted successfully." };
};