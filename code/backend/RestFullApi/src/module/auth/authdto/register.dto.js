import joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js"

class registerDto extends BaseDto{
    static schema=joi.object({
        name:joi.string().trim().min(2).max(50).required(),
        email:joi.string.trim().email().lowerCase().required(),
        password:joi.string().message("passWord must contaion a 8 charters").min().required(),
        role:joi.string().valid("custmors","sellers","admin").default("custmors")

    })
}
export default registerDto;                     