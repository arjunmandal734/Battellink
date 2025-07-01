import {
    upsertContestRoom,
    getContestRoom,
    getAllRoomsForContest,
    updateRoomDetails,
    deleteContestRecords,
  } from "../models/dynamodb/contestRoom.model.js";
  
  /**
   * Service to create or update room details
   */
  export const upsertContestRoomService = async (roomData) => {
    return await upsertContestRoom(roomData);
  };
  
  /**
   * Service to get specific room details by contest and group
   */
  export const getContestRoomService = async (contestId, groupNumber) => {
    return await getContestRoom(contestId, groupNumber);
  };
  
  /**
   * Service to get all rooms for a contest
   */
  export const getAllRoomsForContestService = async (contestId) => {
    return await getAllRoomsForContest(contestId);
  };
  
  /**
   * Service to update room details
   */
  export const updateRoomDetailsService = async (
    contestId,
    groupNumber,
    newRoomId,
    newRoomPassword
  ) => {
    return await updateRoomDetails(contestId, groupNumber, newRoomId, newRoomPassword);
  };
  
  /**
   * Service to delete all room records for a contest
   */
  export const deleteContestRecordsService = async (contestId) => {
    return await deleteContestRecords(contestId);
  };
  