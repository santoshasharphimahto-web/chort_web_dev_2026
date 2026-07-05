import ApiError from "../../common/utiles/res/api-error.js"
import User from "./auth.model.js"
import { accessToken, accessTokenVerify, genreateUserVerificationToken, refreshToken,  refreshTokenVerfiy } from "../../common/utiles/token/verficationToken.js";
import crypto, { verify } from "crypto"
import { isMainThread } from "worker_threads";
import {sendEmail,VerfiyPasswordEmail} from "../../common/utiles/mail/sendMail.js"
import fs from "node:fs"

const hashToken = async (Token) => {
  return crypto.createHash("Sha256")
    .update(Token)
    .digest("hex");
};

const registerService = async ({ email, name, role, password }) => {
  const user = await User.findOne({ email });

  console.log('email', email);
  if (user) {
    throw ApiError.conflict("user all ready exits with this email");
  }
  
  const { rawToken, hasedToken } = await genreateUserVerificationToken();
  
  const userRes = await User.create({
    name,
    email,
    password, 
    role,
    verificationToken: hasedToken 
  });

  const MyrefreshToken =  await refreshToken({ id: userRes._id });
  const MyaccessToken = await accessToken({ id: userRes._id, role: userRes.role });

  try {
    sendEmail(email, rawToken, name);
  } catch (error) {
    console.log(error.message);
  }

  userRes.refreshToken = await hashToken(MyrefreshToken);
  await userRes.save({ validateBeforeSave: false });

  const userObj = userRes.toObject();
  delete userObj.password;

  return { user: userObj, accessToken: MyaccessToken, refreshToken: MyrefreshToken };
};

// creating a login Services
const loginService= async({email,password})=>{
  
  const user=await User.findOne({email}).select("+password").select("+refreshToken")
  if(!user) throw ApiError.badrequest("user with this email exits");
  // som how i will checks the password
  // if(!user.isVerfied) throw ApiError.forbidden("please verfiy you email")
  const MyrefreshToken= await refreshToken({id:user._id})
  const MyaccessToken= await accessToken({id:user._id,role:user.role})
  user.refreshToken=await hashToken(MyrefreshToken)
   await user.save({validateBeforeSave:false})
  const userobj=user.toObject()
  delete userobj.refreshToken
  delete userobj.password

  return {user:userobj,refreshToken:MyrefreshToken,accessToken:MyaccessToken}

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
    const accessToken=await accessToken({id:user._id,role:user.role})
    const refreshToken=await refreshToken({id:user._id})
    user.refreshToken=await hashToken(refreshToken)
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

const uploadAvatarService = async (userId, file) => {
  // 1. Safety Guard: Make sure Multer actually successfully caught a file
  if (!file || !file.path) {
    throw new Error("No file provided or file upload failed locally.");
  }

  // 2. Extra Safety Guard: Check if the file physically exists before streaming
  if (!fs.existsSync(file.path)) {
    throw new Error(`Local file not found at path: ${file.path}. Check your folder setup.`);
  }

  let fileStream;

  try {
    // 3. Create the stream safely
    fileStream = fs.createReadStream(file.path);

    // 4. Upload directly to ImageKit via stream
    const uploadResponse = await imagekitConfig.upload({
      file: fileStream,
      fileName: file.originalname,
      folder: "Users/Avatars"
    });

    // 5. Explicitly destroy/close the stream so Windows releases the file handle lock
    fileStream.destroy();

    // 6. Save the new avatar URL to MongoDB
    await User.findByIdAndUpdate(userId, { avatar: uploadResponse.url }, { new: true });

    // 7. Success clean-up: Remove the file from local uploads
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      avatarUrl: uploadResponse.url,
      fileId: uploadResponse.fileId // Fixed typo from 'filedId'
    };

  } catch (err) {
    // 8. If the stream is still open during an error, destroy it so it can be safely unlinked
    if (fileStream && typeof fileStream.destroy === 'function') {
      fileStream.destroy();
    }

    // 9. Error Clean-up: Safely remove the local file if it exists
    try {
      if (file && file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (cleanupErr) {
      console.error("Failed to delete file after upload error:", cleanupErr.message);
    }

    // 10. Bubble up the error to your controller/error middleware
    throw err;
  }
};

export{
    registerService,
    loginService,
    verifyUserService,
    newPasswordService,
    forgetPasswordService,
    logoutService,
    profileServicce,
    refershservice,
    uploadAvatarService

}