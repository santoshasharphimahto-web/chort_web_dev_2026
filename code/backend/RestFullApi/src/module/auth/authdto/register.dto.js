import joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class registerDto extends BaseDto {
    static schema = joi.object({
        name: joi.string().trim().min(2).max(50).required(),
        email: joi.string().trim().email().lowercase().required(),
        password: joi.string().min(8).required(), // 👈 यहाँ सिंपल कर दिया
        role: joi.string().valid("custmors", "sellers", "admin").default("custmors")
    })
}

export default registerDto;