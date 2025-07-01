import express from "express";
import { registerUnverifiedUserController, logInUserController } from "../controllers/authController.js";


const userRouter = express.Router();


userRouter.route("/register").post(registerUnverifiedUserController);
userRouter.route('/login').post(logInUserController)



export default userRouter;

