import customResponse from '../utils/customResponse.js';
import { registerUnverifiedUser, logInUserService, deleteUserService, updateUserService } from '../services/userProfileService.js';
import CustomError from '../utils/customError.js';
import asyncHandler from '../utils/asyncHandeler.js';
import { generateAndSetAccesstokenCookie, clearAccessToken } from '../utils/generateTokenAndSetCookie.js';


export const registerUnverifiedUserController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError(401, 'Email and Password is required!!');
  }
  // Add user to firebase
  const userRecord = await registerUnverifiedUser(email, password);

  return customResponse(res, userRecord.uid);

})


export const logInUserController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError(401, "Email and password is required");
  }
  const userRecord = await logInUserService(email, password);
  if (userRecord) {
    const { uId, role } = userRecord;
    generateAndSetAccesstokenCookie(res, uId, role);
  }

  return customResponse(res, userRecord.uId);
})


export const deleteUserAccount = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError(401, "Email and passward is required");
  }
  // Delete the user from firebase
  const response = await deleteUserService(email, password);

  // Deleting the cookie
  clearAccessToken(res);
  return customResponse(res, response);
})

export const updateUser = asyncHandler(async (req, res) => {
  const { userId, userData } = req.body;
  if (!userId && !userData) {
    throw new CustomError(401, "User data is missing");
  }
  const userRecord = updateUserService(userId, userData);
  return customResponse(res, userRecord);
})

export const logoutUser = asyncHandler(async (req, res, next) => {

  // Deleting the cookie
  clearAccessToken(res);
  return customResponse('Successfuly logout');
})