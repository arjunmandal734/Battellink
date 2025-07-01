import express from "express";
import { deleteUserAccount, logoutUser, updateUser } from "../controllers/authController.js";


const profileRouter = express.Router();


profileRouter.route('/delete').delete(deleteUserAccount);
profileRouter.route('/logout').post(logoutUser);
profileRouter.route('/update').post(updateUser);

export default profileRouter;