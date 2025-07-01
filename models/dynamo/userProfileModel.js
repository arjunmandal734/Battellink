import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../../config/aws.js";
import CustomError from "../../utils/customError.js";


const TableName = process.env.DYNAMODB_USERS_TABLE;

export const createUser = async (userData) => {
    try {
        const params = {
            TableName,
            Item: userData,
        };
        await dynamoClient.send(new PutCommand(params));
        return userData;

    } catch (error) {
        throw new CustomError(503, error);
    };
};


export const getUserById = async (uId) => {
    try {
        const params = {
            TableName,
            Key: { uId: uId },
        };
        const result = await dynamoClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        throw new CustomError(503, "cant get the user", modelfunction);
    }
};


export const getAllUsers = async () => {
    try {
        const params = {
            TableName,
        };
        const result = await dynamoClient.send(new ScanCommand(params));
        return result.Items;
    } catch (error) {
        throw new CustomError(503, "cant get all the users", modelfunction);
    }
};


export const updateUser = async (uId, userData) => {
    try {

        // Prepare update expression dynamically
        let updateExpression = "set updatedAt = :updatedAt";
        let expressionAttributeValues = {
            ":updatedAt": new Date().toISOString(),
        };

        Object.keys(userData).forEach((key, index) => {
            if (key !== "uId") {
                updateExpression += `, ${key} = :${key}`;
                expressionAttributeValues[`:${key}`] = userData[key];
            }
        });


        // Update user in DynamoDB
        const params = {
            TableName,
            Key: { uId: uId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoClient.send(new UpdateCommand(params));

        if (!result.Attributes) {
            throw new CustomError(404, "User not found");
        }

        return result.Attributes;
    } catch (error) {
        throw new CustomError(500, "Error updating user", modelfunction);
    }
};



export const deleteUser = async (uId) => {
    try {
        const params = {
            TableName,
            Key: { uId: uId },
        };
        await dynamoClient.send(new DeleteCommand(params));
        return { message: "User deleted successfully" };
    } catch (error) {
        throw new CustomError(503, "user cant delete", modelfunction);
    }
};
