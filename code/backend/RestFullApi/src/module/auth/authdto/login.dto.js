import joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';
// import { PassThrough } from 'nodemailer/lib/xoauth2';

class loginDto extends BaseDto{
    static schema=joi.object({
       email:joi.string().trim().email().lowercase().required(),
       password:joi.string().min(8).required()
    })
}
export default loginDto