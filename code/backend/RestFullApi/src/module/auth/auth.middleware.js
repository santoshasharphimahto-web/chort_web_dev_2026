import User from "./auth.model.js"
import { accessTokenVerify} from "../../common/utiles/token/verficationToken.js"
import ApiError from "../../common/utiles/res/api-error.js";

function authme(req,res,next){
    const token;
    if(req.headers.authorization?.startWith("bearear")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token) throw ApiError.unauthorized("not a authorizedToken")
    const decoded=accessTokenVerify(token)
    const user=await User.findById(decoded.id)
    if(!user) throw ApiError.forbidden("please login again")
    req.user={
        id:user._id,
        name:user.name,
        role:user.role,
        email:user.email
    }
    next()

}

const roleBaseAccesaced=(...role)=>{
    return (req,res,next)=>{
      if(!role.includes(req.user.role)) throw ApiError.forbidden("you do not have a permission to acces")
        next()
    }
}

export{
    roleBaseAccesaced,
    authme
}