import ApiResponse from "../../common/utiles/res/api-respons.js";
import ApiError from "../../common/utiles/res/api-error.js";
import *as authservice from "auth.service.js"

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
  ApiResponse.ok(res,"login Succesful",{user,accessToken,refreshToken})
  
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

const refresh=async(req,res)=>{
  const{user,accessToken,refreshToken}= await authservice.registerService(req.headers.authorization)
  ApiResponse.ok(res,"token Refreshed",{user,accessToken,refreshToken})
}

const verifyUser=(req,res)=>{
  const user=await authservice.verifyUserService(req.qurey)
  ApiResponse.ok(res,"verified usere",user)
}
export {
    register,
}