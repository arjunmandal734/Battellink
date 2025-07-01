import { verifyAccessJWT } from "../utils/generateTokenAndSetCookie";

export const verifyUserByAccessToken = (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) return res.status(401).json({ message: "Unauthorized - Token missing" });

    const decoded = verifyAccessJWT(accessToken);
    if (!decoded.uid) { return res.status(401).json({ message: "Unauthorized -  invalid token" }); }    // { uid, role, isVerified}
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const verifyUserVerification = (req, res, next) => {
  try {
    const emailVerified = req.user?.emailVerified;
    if (!emailVerified) {
      
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized - Email is not verified" });
    }

  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Protect route by role
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied - insufficient permissions" });
    }
    next();
  };
};
