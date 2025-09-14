import { generateToken } from "../middlewares/generateToken.js";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


//Register
export const registerAdmin = async (req, res) => {
  try {
    const { adminName, email, password } = req.body;
    console.log(adminName, email, password)
    if (!adminName || !email || !password) {
      return errorHandler(res, 500, "Missing Fields!");
    }

    const existingAdmin = await adminModel.findOne({ email });
    console.log(existingAdmin)
    if (existingAdmin) {
      return errorHandler(res, 500, "Admin Already Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)


    const admin = await adminModel.create({
        adminName,
        email,
        password: hashedPassword
    })
    console.log(admin)

    const token = generateToken(admin)
    if(!token){
        return errorHandler(res, 500, "Error Generating Token")
    }
    console.log(token)

    const {password : adminPassword, ...otherDetails} = admin._doc

    return successHandler(res, 200, "Admin registered successfully", otherDetails)
  } catch (error) {
    console.log(error, "error in registerAdmin")
    return errorHandler(res, 500, error)
  }
};



// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorHandler(res, 500, "Missing Fields!");
  }

  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return errorHandler(res, 500, "User not found!");
    }
    
    const matchPassword = await bcrypt.compare(password, admin.password);

    if (!matchPassword) {
      return errorHandler(res, 500, "Invalid Credentials!");
    }

    const token = generateToken(admin);

    const { password : adminPassword, ...adminDetails} = admin._doc

    return successHandler(res, 200, "User Logged in successfully", {adminDetails, token})
  } catch (error) {
    console.log(error)
    return errorHandler(res, 500, error?.message);
    
  }
};