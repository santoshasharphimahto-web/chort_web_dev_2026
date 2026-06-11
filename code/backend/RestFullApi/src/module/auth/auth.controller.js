import ApiResponse from "../../common/utiles/res/api-respons.js";
import ApiError from "../../common/utiles/res/api-error.js";
import *as authservice from "auth.service.js"

const register=async(req,res)=>{
  const createdUser= await authservice.registerService(req.body)
  ApiResponse.created(res,"user has created",createdUser)

}

export {
    register,
}