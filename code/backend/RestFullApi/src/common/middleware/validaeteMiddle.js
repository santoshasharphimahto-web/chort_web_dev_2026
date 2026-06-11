import ApiError from "../utiles/res/api-error.js";

const validateData= (DtoClass)=>{
    return(req,res,next)=>{
        const {error,value}=DtoClass.validate(req.body)
        if(error){
            throw ApiError.badrequest(error.join(","))
        }

        req.body=value
        next();
    }

}

export default validateData;