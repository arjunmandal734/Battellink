import {addUser, getUser} from '../functions/firebaseFunctions.js';
import CustomError from '../utils/customError.js';

export const addUserService = async(userData)=>{
    try{
        if(!userData){
            throw new CustomError (400, 'No user data found');
        }
       const userRecord = await addUser(userData);
       return {
        message: "User created successfully",
        data: userRecord,
    };

    }catch(error){
        throw new CustomError(error.statusCode, error.message );
    }
}


export const getUserService = async(userData)=>{
    try{
        if(!userData){
            throw new CustomError (400, 'No user data found');
        }
       const userRecord = await addUser(userData);
       return {
        message: "User created successfully",
        data: userRecord,
    };

    }catch(error){
        throw new CustomError(error.statusCode, error.message );
    }
}


export const deleteUserService = async(userData)=>{
    try{
        if(!userData){
            throw new CustomError (400, 'No user data found');
        }
       const userRecord = await addUser(userData);
       return {
        message: "User created successfully",
        data: userRecord,
    };

    }catch(error){
        throw new CustomError(error.code, error.message );
    }
}