import express from "express";
import { createContestController, deleteContestController, updateContestController, getAllContestsController } from '../controllers/contestController.js';



const contestroute = express.Router();

contestroute.route("/create").post(createContestController);
contestroute.route("/delete").delete(deleteContestController);
contestroute.route("/update").delete(updateContestController);
contestroute.route("/allcontests/:game").get(getAllContestsController);

export default contestroute;

