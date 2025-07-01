import * as contestService from "../services/contestService.js";
import CustomError from "../utils/customError.js";
// import validateContestInput from "../validations/contestInputDataValidation.js";

/**
 * 🆕 Create a new contest
 */
export const createContestController = async (req, res, next) => {
    try {
        const contestData = req.body;
        /*
                // ✅ Validate input using Joi
                const { error } = validateContestInput(contestData);
                if (error) {
                    throw new CustomError(400, error.details.map((err) => err.message).join(", "));
                }
                    */
        if (!contestData) return res.status(500).json({ message: "Internal server err" });

        // If pass the validation
        const newContest = await contestService.createNewContestService(contestData);
        res.status(201).json({ message: "Contest created successfully", contest: newContest });
    } catch (error) {
        next(error); // Pass error to error handler
    }
};

/**
 * 🔍 Find contest by ID
 */
export const getContestByIdController = async (req, res, next) => {
    try {
        const contestId = req.params.id;
        if (!contestId) {
            throw new CustomError(404, "Id is needed");
        } else {
            const contest = await contestService.fetchContestService(contestId);

            if (!contest) throw new CustomError(404, "Contest not found");

            res.json(contest);
        }
    } catch (error) {
        next(error);
    }
};

/**
 * 📋 Get all contests
 */
export const getAllContestsController = async (req, res, next) => {
    try {
        const contests = await contestService.fetchAllContestsService();
        res.json(contests);
    } catch (error) {
        next(error);
    }
};

/**
 * ✏️ Update contest by ID
 */
export const updateContestController = async (req, res, next) => {
    try {
        const contestId = req.params.id;
        const updateData = req.body;

        if (!Object.keys(updateData).length) {
            throw new CustomError(400, "No update data provided");
        }

        const updatedContest = await contestService.modifyContestService(contestId, updateData);
        if (!updatedContest) throw new CustomError(404, "Contest not found");

        res.json({ message: "Contest updated successfully", contest: updatedContest });
    } catch (error) {
        next(error);
    }
};


//❌ Delete contest by ID

export const deleteContestController = async (req, res, next) => {

    try {
        const contestId = req.body.contestId;
        if (!contestId) {
            throw new CustomError(404, "Contest Id is needed");
        };
        const result = await contestService.removeContestService(contestId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};


// ✅ Fetch contests by Game Name
export const getContestsByGameController = async (req, res, next) => {
    try {
        const { gameName } = req.params;
        if (!gameName) throw new CustomError(400, "Game name is required");

        const contests = await contestService.getContestsByGameService(gameName);
        res.status(200).json({ success: true, contests });
    } catch (error) {
        next(error);
    }
};


