import admin from "../config/firebase.js";
import axios from "axios";
import CustomError from "../utils/customError.js";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

// 1. Create user via Admin SDK
export const addUser = async (email, password) => {
  try {
    if (!email || !password) { throw new CustomError(400, "Email and Passward is missing!!") };

    const user = await admin.auth().createUser({
      email,
      password
    });
    if (!user) { throw new CustomError(500, 'User not created') };
    return user;
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
};

// 2. Login user via Firebase Auth REST API
export const getUser = async (email, password) => {

  if (!email || !password) { throw new CustomError(400, "Email and Passward is missing!!") };
  const url = `${process.env.FIREBASE_PUBLIC_UR}${FIREBASE_API_KEY}`;

  const payload = {
    email,
    password,
    returnSecureToken: true,
  };
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    throw new CustomError(502, "Can not get the user")
  }
};

export const deleteUser = async (email, password) => {
  try {
      const userRecord = await getUser(email, password);
      await admin.auth().deleteUser(response.data.localId);
  } catch (error) {
    throw new CustomError(error.statusCode, error.message);
  }
}

// 3. Verify ID token
export const verifyIdToken = async (idToken) => {
  const decoded = await admin.auth().verifyIdToken(idToken);
  return response
};

