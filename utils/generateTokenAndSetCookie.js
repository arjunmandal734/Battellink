import jwt from "jsonwebtoken";
import CustomError from "./customError.js";


export const verifyAccessJWT = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};


export const verifyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

//  Generate Cookie

export const generateRefreshToken = (uid, role, email) => {
  const token = jwt.sign({ uid, role, email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "15d",
  });

  return token;
}

//  Generate Access Token
export const generateAccessToken = (uid, role) => {
  const token = jwt.sign({ uid, role, emailVerified }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15min",
  });

  return token;
}


//   Generate Set Cookie

export const generateAndSetRefreshTokenCookie = (res, uid, role, email) => {

  const refreshToken = generateRefreshToken(uid, role, email);

  // When setting the refresh token cookie (only sent to /auth/refresh)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/auth/refresh",   // <<< only sent when the browser requests /auth/refresh
    maxAge: 15 * 24 * 60 * 60 * 1000, // 7 days
  });
};


export const generateAndSetAccesstokenCookie = (res, uid, role) => {
  try {
    const accessToken = generateAccessToken(uid, role);

    // When setting the access token cookie (available on all routes)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",               // sent to every path on your domain
      maxAge: 15 * 60 * 1000,  // 15 minutes
    });
  } catch (error) {
    throw new CustomError(501, "Error generating and setting cookie");
  }
}


export const clearAccessToken = (res) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}


export const clearRefreshToken = (res) => {

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}