import crypto from "crypto"
import jwt from "jsonwebtoken"

const genreateUserVerificationToken=async()=>{
      const rawToken=crypto.randomBytes(32).toString("hex")
      const hasedToken=crypto
      .createHash("Sha256")
      .update(rawToken)
      .digest("hex")
      return {rawToken,hasedToken}

}
const refreshToken= async(payload)=>{
   return jwt.sign(payload,process.env.JWT_REFRESHTOKEN_SECREATE,{
      expiresIn:process.env.JWT_REFRESHTOKEN_EXPIREY||"7d",
    })

}
const refreshTokenVerfiy= async(Token)=>{
   return jwt.verify(Token,process.env.JWT_REFRESHTOKEN_SECREATE)
}
const accessToken= async(payload)=>{
   return jwt.sign(payload,process.env.JWT_ACCESSSTOKEN_SECREATE,{
      expiresIn:process.env.JWT_ACCESSTOKEN_EXPIREY||"15m",
    })

}
const accessTokenVerify= async(payload)=>{
   return jwt.sign(payload,process.env.JWT_ACCESSSTOKEN_SECREATE)

}


export{
    genreateUserVerificationToken,
    accessToken,
    accessTokenVerify,
    refreshToken,
    refreshTokenVerfiy,
}