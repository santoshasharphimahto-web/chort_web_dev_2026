import ApiError from "../../common/utiles/res/api-error"
import User from "./auth.model.js"
import { accessToken, accessToken, accessTokenVerify, genreateUserVerificationToken, refreshToken, refreshToken, refreshTokenVerfiy } from "../../common/utiles/token/verficationToken.js";
import crypto from "crypto"


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

  const {rawToken,hasToken}=genreateUserVerificationToken()
  const user=await User.create({
    name,
    email,
    password,
    role,
    isVerfied,
    verificationToken:hasToken
  })

  // todo sendin a email for the verfication
  // for the deletion of the code 
  const userObj=user.toObject()
   delete userObj.password
  return {user:userObj,rawToken}

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
// refreshing the acccesToken after expire 
// take the token 
// validate it
// verfifyit for decode 
// find the user 
// mathe user token and comingToken
// if mathc

const refershservice=async(token)=>{
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


export{
    registerService,
}