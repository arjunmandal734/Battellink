import * as contestResultModel from "../models/contestResult.model.js";
import CustomError from "../utils/customError.js";

// ✅ Save Contest Result
export const saveResult = async (resultData) => {
    try {
        const result = await contestResultModel.saveContestResult(resultData);
        return {
            message: "Contest result saved successfully",
            data: result,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error saving contest result", error);
    }
};

// ✅ Get Contest Results by Contest ID
export const fetchResultsByContestId = async (contestId) => {
    try {
        const results = await contestResultModel.getContestResults(contestId);

        if (!results || results.length === 0) {
            throw new CustomError(404, "No contest results found");
        }

        return {
            message: "Contest results fetched successfully",
            data: results,
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error fetching contest results", error);
    }
};

// ✅ Delete Contest Result by Contest ID
export const deleteResultByContestId = async (contestId) => {
    try {
        const response = await contestResultModel.deleteContestResult(contestId);
        return {
            message: response.message || "Contest result deleted successfully",
        };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Error deleting contest result", error);
    }
};
