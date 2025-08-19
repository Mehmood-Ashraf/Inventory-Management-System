import jwt from "jsonwebtoken";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const verifyToken = (req, res, next) => {
  // console.log("Verify token chala")
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      // console.log("Token nahi mila")
      return errorHandler(res, 401, "Access Denied!, Token not available");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded)
    req.user = decoded
    next()

  } catch (error) {
    console.log("Error in verifiedToken", error.message);
    return errorHandler(res, 403, "Invalid or Expired token!");
  }
};
