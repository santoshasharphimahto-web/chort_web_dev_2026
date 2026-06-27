import ApiError from "../../common/utiles/res/api-error"
import User from "./auth.model.js"
import { accessToken, accessTokenVerify, genreateUserVerificationToken, refreshToken,  refreshTokenVerfiy } from "../../common/utiles/token/verficationToken.js";
import crypto, { verify } from "crypto"
import { isMainThread } from "worker_threads";
import {sendEmail,VerfiyPasswordEmail} from "../../../src/common/utiles/token/verficationToken.js"


const hashToken=async (Token)=>{
  return crypto.createHash("Sha256")
   .update("Token")
   .digest("hex")
}

const registerService= async({email,name,role,password})=>{

// acccept a data fro the user email,passwod,name,roll
// validate it 
// check email alredy exits in db
//if not,create a user in db ({name,emai,pass,isverfied,verficatoken})
//hash password before svae
// send a email for the verfication token
// send a res after succes 201
  const user = await User.findOne({email});
  if(user){
    throw ApiError.conflict("user all ready exits with this email")
  }
  
  const refreshToken= refreshToken({id:user._id})
  const accessToken= accessToken({id:user._id,role:user.role})

  const {rawToken,hasedToken}=genreateUserVerificationToken()
  const user=await User.create({
    name,
    email,
    password, // some how i willl hash the password
    role,
    isVerfied,
    refreshToken:hashToken(refreshToken),
    verificationToken:hasedToken

  })




  // todo sendin a email for the verfication
     try{
      sendEmail(email,rawToken)
     }catch(error){
      console.log(error.message)
     }
  // for the deletion of the code 
  const userObj=user.toObject()
   delete userObj.password
  return {user:userObj,accessToken}

}

// creating a login Services
const loginService= async({email,password})=>{
  
  const user=await User.findOne({email}).select("+password").select("+refreshToken")
  if(!user) throw ApiError.badrequest("user with this email exits");
  // som how i will checks the password
  if(!user.isVerfied) throw ApiError.forbidden("please verfiy you email")
  const refreshToken= refreshToken({id:user._id})
  const accessToken= accessToken({id:user._id,role:user.role})
  user.refreshToken=hashToken(refreshToken)
   await user.save({validateBeforeSave:false})
  const userobj=user.toObject()
  delete userobj.refreshToken
  delete userobj.password

  return {user:userobj,refreshToken,accessToken}

}
// refreshing the acccesToken after expire SERVICE


const refershservice=async(token)=>{
  
// take the token 
// validate it
// verfifyit for decode 
// find the user 
// mathe user token and comingToken 
// if mathc generate a aacessToken 
// store refreshToken in db and send a accesstoken on forentend 
  if(!token) throw ApiError.badrequest("token is required")
  if(!refreshTokenVerfiy(token)) throw ApiError.unauthorized("invalied token")
    const decoded= refreshTokenVerfiy(token)
  const user= await User.findById(decoded._id).select("+refreshToken")
  if(!user.refreshToken===hashToken(token)) throw ApiError.unauthorized("invalid Refresh Token")
    const accessToken=accessToken({id:user._id,role:user.role})
    const refreshToken=refreshToken({id:user._id})
    user.refreshToken=hashToken(refreshToken)
    await user.save({validateBeforeSave:false})
    const userObj=user.toObject()
    delete userObj.refreshToken

    return {user:userObj,accessToken,refreshToken}


}

// LOGOUT SERVICE
const logoutService= async(UserId)=>{
// accet a id from the user
// find the user in db
// if !user , throw error
//if user , refreshToken ko null

// const user=await User.findById(UserId).select("+refreshToken")
// if(!user) throw ApiError.noFound("user with this Id noFound")
// user.refreshToken=null; 
// await user.save({validateBeforeSave:false});

// Advance version of the code 
await User.findByIdAndUpdate(UserId,{refreshToken:null});




}

//FORGETPASSWORD SERVICE

const forgetPasswordService= async({email})=>{

  // take email and pass from the req.body
  // find the user with email in db
  // if !user,throw error
  // if user , generate a token
  // add token as refence in db,hased formate 
  // send rawtoken atach,  to the user as email

  
 const user=await User.findOne({email}).select("").select("+restPasswordToken").select("+restPasswordExpires")
 if(!user) throw ApiError.badrequest("user no exits with this email");
  const {rawToken,hasedToken}= genreateUserVerificationToken();
  user.restPasswordToken=hasedToken;
  user.restPasswordExpires=Date.now() +(15*60*1000)
  await user.save({validateBeforeSave:false})

  try{
    verifyPasswordEmail(email,rawToken)
  }catch(error){
    console.log(error.message)
  }
  


}
// NEW PASSWORD SEVICE
const newPasswordService=async (token,newPassword)=>{
  // validate a token
  // find user on the base of hashToken
  // if user, user.password ko hash 
  // save user ,sned back
  if(!token||!newPassword) throw ApiError.badrequest("provied a token and passord")
  const user=await User.findOne({restPasswordToken:hashToken(token)}).select("+password")
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    const userObj=user.toObject()
    delete userObj.password;
 
}

const verifyUserService=async(token)=>{
  // accept a token from thee user 
  // find a user in the db with hasToken

  // if user, isverfied :true,verfiactiontoken:null
  // send a user 

  if (!token) throw ApiError.badrequest("provied a valied Token").select("+verificationToken")
  const user=  await User.findOne({verificationToken:hashToken(token)})
    user.isVerfied=true;
    user.verificationToken=null;
    await user.save({validateBeforeSave:false})
    const userObj=user.toObject()
    delete userObj.verificationToken;
    return {user:UserObj}

}

const profileServicce=async (UserId)=>{
  const user= await User.findById(UserId);
  return {user}
}



export{
    registerService,
}