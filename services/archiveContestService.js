import {
    createArchivedContest,
    getArchivedContestById,
    getAllArchivedContests,
    deleteArchivedContest,
    getArchivedContestsByGame
} from "../models/mongo/archivedContestModel.js";

/**
 * Create and save an archived contest
 */
export const createArchivedContestService = async (contestData) => {
    return await createArchivedContest(contestData);
};

/**
 * Fetch archived contest by ID
 */
export const getArchivedContestByIdService = async (contestId) => {
    return await getArchivedContestById(contestId);
};

/**
 * Fetch all archived contests
 */
export const getAllArchivedContestsService = async () => {
    return await getAllArchivedContests();
};

/**
 * Delete archived contest by ID
 */
export const deleteArchivedContestService = async (contestId) => {
    return await deleteArchivedContest(contestId);
};

/**
 * Fetch archived contests by game name
 */
export const getArchivedContestsByGameService = async (gameName) => {
    return await getArchivedContestsByGame(gameName);
};
