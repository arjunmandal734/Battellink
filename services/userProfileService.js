import * as userProfileModel from "../models/dynamo/userProfileModel.js";
import CustomError from "../utils/customError.js";
import * as gameProfile from "../models/dynamo/gameProfileModel.js";
import serviceResponse from "../utils/serviceReturn.js";
import { addUser, deleteUser, getUser } from '../functions/firebaseFunctions.js';



export const registerUnverifiedUser = async (email, password) => {

    try {
        if (!email || !password) {
            throw new CustomError(404, "Email and password is missing");
        }
        // Add to firebase
        const user = await addUser(email, password);

        // Send email verification link
        // await firebaseAuth.generateEmailVerificationLink(email);

        return serviceResponse('User registered successfuly', user);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            throw new CustomError(403, 'User with same email is present');
        }
        throw new CustomError(error.statusCode, error.message);
    }

}



/**
 * Service to get a user by ID
 * @param {string} userId - User ID
 */
export const logInUserService = async (email, password) => {
    try {
        if (!email || !password) {
            throw new CustomError(404, "Email and password is missing");
        }
        // Log in in firebase
        const user = await getUser(email, password);
        // Cheacking and creating profile in database
        if (!user.emailVerified) {
            throw new CustomError(402, 'Your email is not verified. Please verify your email!!');
        } else {
            const userProfile = await getUserById(uId);
            if (!userProfile) {
                const UserData = {
                    "uId": user.localId,
                    "email": user.email,
                    "name": user.email,
                    "role": 'PLAYER',
                    "emailVerified": "true",
                };
                user.profile = await createUser(UserData);
            } else {
                user.profile = userProfile;
            }

        }
        // Return the result
        return serviceResponse('User featched successfuly', user);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Service to get all users
 */
export const getAllUsersService = async () => {
    try {
        return await userProfileModel.getAllUsers();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Service to update user details
 * @param {string} userId - User ID
 * @param {Object} userData - Fields to update
 */
export const updateUserService = async (userId, userData) => {
    try {
        if (!userId || !userData) {
            throw new CustomError(404, "user id and user data is needed.");
        }
        const updatedUser = await userProfileModel.updateUser(userId, userData);
        if (!updatedUser) {
            throw new CustomError(404, "User not found.");
        }
        return serviceResponse('User updated successfuly', updatedUser);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};

/**
 * Service to delete a user
 * @param {string} userId - User ID
 */
export const deleteUserService = async (email, password) => {
    try {
        await deleteUser(email, password);
        return serviceResponse('User deleted successful');
    } catch (error) {
        throw new CustomError(error.statusCode || 500, error.message);
    }
};
