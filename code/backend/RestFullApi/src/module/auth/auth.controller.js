import ApiResponse from "../../common/utiles/res/api-respons.js";
import ApiError from "../../common/utiles/res/api-error.js";
import *as authservice from "./auth.service.js"

const register=async(req,res)=>{
  const createdUser= await authservice.registerService(req.body)
  ApiResponse.created(res,"user has created",createdUser)

}
//LOGIN CONTROLLER
const login= async (req,res) => {
  const {user,accessToken,refreshToken}=authservice.loginService(req.body)
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    maxAge:7*24*60*60*1000
  })
  res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:true,
    // maxAge:7*24*60*60*1000
  })
  ApiResponse.ok(res,"login Succesful",{user:user,accessToken:accessToken,refreshToken:refreshToken})
  
}
// LOGOUT ROUTES
const logOut=async(req,res)=>{
 await authservice.logoutService(req.user.id);
 res.clearCookie('refreshToken')
 ApiResponse.ok(res,"logout successful")

}

const getMe= async(req,res)=>{
  const {user}=await authservice.profileServicce(req.user.id)
  ApiResponse.ok(res,"userProfile",user)
}
const refresh = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Invalid or missing authorization header" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res.status(400).json({ message: "Invalid token format" });
    }

    const token = parts[1];

    // 1. Get the result from the service
    const result = await authservice.refershservice(token);
    
    // 2. Check if the service returned null or undefined
    if (!result) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    // 3. Safe to destructure now
    const { user, accessToken, refreshToken } = result;
    
    ApiResponse.ok(res, "token Refreshed", { user, accessToken, refreshToken });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
const verifyUser= async(req,res)=>{
  const user=await authservice.verifyUserService(req.query.token)
  ApiResponse.ok(res,"verified usere",user)
}
const forgetPassword=async (req,res) => {
  await authservice.forgetPasswordService(req.body)
  
} 
const newpassword=async (req,res) => {
  await authservice.newPasswordService(req.body,req.params.token)
}
const uploadAvatar = async (req, res, next) => {
  try {
    const file = req.file;

    // 1. CRITICAL FIX: Agar file nahi hai, toh yahin se response send karo aur return ho jao
    if (!file) {
      // Agar aapka ApiError ek standard class hai toh use next(error) mein pass karo ya res ke saath bhejo
      // Agar aapka custom custom response handler hai toh use res pass karna padega:
      return res.status(400).json({
        success: false,
        message: "Bhai, koi file upload nahi hui! Postman check karo."
      });
    }

    // 2. Agar file sahi salamat mil gayi, tabhi service call hogi
    const result = await authservice.uploadAvatarService(req.user.id, file);

    // 3. Response bhejte waqt result bhejdo jisme avatarUrl aur fileId dono hain
    return apiResponse.ok(res, "Avatar uploaded successfully", result);

  } catch (err) {
    // 4. CRITICAL FIX: Asli error ko console mein dekho taaki andhere mein teer na chalana pade
    console.error("Error inside uploadAvatar controller:", err);
    
    // Asli error ko Express ke global error handler ko pass karo
    return next(err); 
    // Ya fir agar purana tarika hi chahiye toh aise:
    // return res.status(500).json({ success: false, message: "Failed to upload avatar" });
  }
}
export {
    register,
    logOut,
    refresh,
    verifyUser,
    getMe,
    login,
    forgetPassword,
    newpassword,
    uploadAvatar,
}