import * as joinContestModel from "../models/joinContestModel.js";
import CustomError from "../utils/customError.js";

/**
 * Service to create a new contest join entry.
 * @param {Object} joinContestData - Contest join details
 */
export const joinContestService = async (joinContestData) => {
    try {
        if (!joinContestData.contest_id || !joinContestData.user_id) {
            throw new CustomError(400, "Contest ID and User ID are required");
        }

        const newEntry = await joinContestModel.joinContest(joinContestData);
        if (!newEntry) throw new CustomError(500, "Failed to join contest");

        return newEntry;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to fetch a specific contest join entry by contest ID and user ID.
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 */
export const getJoinedContestService = async (contestId, userId) => {
    try {
        if (!contestId || !userId) throw new CustomError(400, "Contest ID and User ID are required");

        const contestEntry = await joinContestModel.getJoinedContest(contestId, userId);
        if (!contestEntry) throw new CustomError(404, "Contest join entry not found");

        return contestEntry;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to fetch all users who joined a specific contest.
 * @param {string} contestId - Contest ID
 */
export const getUsersByContestService = async (contestId) => {
    try {
        if (!contestId) throw new CustomError(400, "Contest ID is required");

        const users = await joinContestModel.getUsersByContest(contestId);
        return users;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to fetch all contests a user has joined.
 * @param {string} userId - User ID
 */
export const getContestsByUserService = async (userId) => {
    try {
        if (!userId) throw new CustomError(400, "User ID is required");

        const contests = await joinContestModel.getContestsByUser(userId);
        return contests;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to update squad members – Users can edit only their squad members.
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 * @param {Array} squadMembers - Array of squad members (IGNs & game IDs)
 */
export const updateSquadMembersService = async (contestId, userId, squadMembers) => {
    try {
        if (!contestId || !userId) throw new CustomError(400, "Contest ID and User ID are required");
        if (!Array.isArray(squadMembers)) throw new CustomError(400, "Squad members should be an array");

        const updatedContest = await joinContestModel.updateSquadMembers(contestId, userId, squadMembers);
        if (!updatedContest) throw new CustomError(404, "Failed to update squad members");

        return updatedContest;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to update room details (room ID, password, and assigned slot) – Only admins can update.
 * @param {string} contestId - Contest ID
 * @param {Object} updates - { room_id, room_password, assigned_slot }
 */
export const updateRoomDetailsService = async (contestId, updates) => {
    try {
        if (!contestId) throw new CustomError(400, "Contest ID is required");
        if (!updates.room_id || !updates.room_password || updates.assigned_slot === undefined) {
            throw new CustomError(400, "Room ID, Room Password, and Assigned Slot are required");
        }

        const updatedContest = await joinContestModel.updateRoomDetails(contestId, updates);
        if (!updatedContest) throw new CustomError(404, "Failed to update room details");

        return updatedContest;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to update game status, score, rank, and reward – Only admins can update.
 * @param {string} contestId - Contest ID
 * @param {Object} updates - { game_status, score, rank, reward }
 */
export const updateGameResultsService = async (contestId, updates) => {
    try {
        if (!contestId) throw new CustomError(400, "Contest ID is required");
        if (!updates.game_status || updates.score === undefined || updates.rank === undefined || updates.reward === undefined) {
            throw new CustomError(400, "Game Status, Score, Rank, and Reward are required");
        }

        const updatedContest = await joinContestModel.updateGameResults(contestId, updates);
        if (!updatedContest) throw new CustomError(404, "Failed to update game results");

        return updatedContest;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};

/**
 * Service to remove a user's entry from a contest.
 * @param {string} contestId - Contest ID
 * @param {string} userId - User ID
 */
export const leaveContestService = async (contestId, userId) => {
    try {
        if (!contestId || !userId) throw new CustomError(400, "Contest ID and User ID are required");

        const response = await joinContestModel.leaveContest(contestId, userId);
        if (!response) throw new CustomError(500, "Failed to leave contest");

        return response;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message || "Internal Server Error");
    }
};
