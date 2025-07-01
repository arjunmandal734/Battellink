// models/archivedContestModel.js

import { ArchivedContest } from "../schemas/archivedContestSchema.js";
import CustomError from "../../utils/customError.js";

// Create an archived contest
export const createArchivedContest = async (contestData) => {
    try {
        const contest = new ArchivedContest(contestData);
        await contest.save();
        return contest;
    } catch (error) {
        throw new CustomError(500, "Failed to create archived contest", error);
    }
};

// Get archived contest by ID
export const getArchivedContestById = async (contestId) => {
    try {
        const contest = await ArchivedContest.findOne({ contest_Id: contestId });
        if (!contest) throw new CustomError(404, "Archived contest not found");
        return contest;
    } catch (error) {
        throw new CustomError(500, "Failed to fetch archived contest by ID", error);
    }
};

// Get all archived contests
export const getAllArchivedContests = async () => {
    try {
        return await ArchivedContest.find().sort({ date: -1 });
    } catch (error) {
        throw new CustomError(500, "Failed to fetch archived contests", error);
    }
};

// Get archived contests by game name
export const getArchivedContestsByGame = async (gameName) => {
    try {
        return await ArchivedContest.find({ game_name: gameName });
    } catch (error) {
        throw new CustomError(500, "Failed to fetch contests by game name", error);
    }
};

// Update an archived contest
export const updateArchivedContest = async (contestId, updateData) => {
    try {
        const updated = await ArchivedContest.findOneAndUpdate(
            { contest_Id: contestId },
            updateData,
            { new: true }
        );
        if (!updated) throw new CustomError(404, "Archived contest not found to update");
        return updated;
    } catch (error) {
        throw new CustomError(500, "Failed to update archived contest", error);
    }
};

// Delete an archived contest
export const deleteArchivedContest = async (contestId) => {
    try {
        const deleted = await ArchivedContest.findOneAndDelete({ contest_Id: contestId });
        if (!deleted) throw new CustomError(404, "Archived contest not found to delete");
        return { message: "Archived contest deleted successfully" };
    } catch (error) {
        throw new CustomError(500, "Failed to delete archived contest", error);
    }
};
