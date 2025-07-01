import { createContest, getContestById, updateContest, getAllContests, deleteContest, getContestsByGame } from "../models/dynamo/contestModel.js";
import CustomError from "../utils/customError.js";
//import * as contestRoomId from "../models/dynamo/contestRoomIdModel.js";
// import * as archivedContest from "../models/mongo/archivedContestModel.js";

export const createNewContestService = async (contestData) => {
    try {
        if(!contestData){
            throw new CustomError(404, "No user data");
        }
        return await createContest(contestData);

    } catch (error){
        throw new CustomError(502, " Error in service layer, Contest cant create");

    }

};

export const fetchContestService = async (contestId) => {
    try {
        const contest = await getContestById(contestId);
        if (!contest) {
            throw new CustomError(404, "Contest cant find");
        }
        return contest;

    } catch (error){
        throw new CustomError(502, " Error in service layer, Contest cant feached");

    }
};

export const fetchAllContestsService = async () => {
    try {
        return await getAllContests();

    } catch(error) {
        throw new CustomError(502, " Error in service layer, All contest cant feached");

    }
};

export const modifyContestService = async (contestId, updateData) => {
    try {
        if(!contestId || !updateData){
            throw new CustomError(404, "No contest id or update data found!!");
        }
        return await updateContest(contestId, updateData);

    } catch(error) {
        throw new CustomError(502, " Error in service layer, Contest cant update");

    }
};

export const removeContestService = async (contestId) => {
    try {
        if(!contestId){
            throw new CustomError(404, "No contest id found!!");
        }
       // const contestData = await getContestById(contestId);
        // await archivedContest.createArchivedContest(contestData);
        //await contestRoomId.deleteContestRecords(contestId);
        return await deleteContest(contestId);

    } catch(error) {
        throw new CustomError(502, `Error in service layer: ${error.message}`);

    }
};


export const getContestsByGameService = async (gameName) => {
    if (!gameName) {
        throw new CustomError(400, "Game name is required.");
    }
    try{
        return await getContestsByGame(gameName);
    }catch(error){
        throw new CustomError(502, "Erron in model, Cant find contests");
    }
};

export const getArchiveContestById = async (contestId)=>{

}
