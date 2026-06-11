import { Router } from "express";
import *as controller from "auth.controller.js"
import validateData from "../../common/middleware/validaeteMiddle.js";
import registerDto from "./authdto/register.dto.js"

const router=Router();
router.post('/register',validateData(registerDto),controller.register)

export default router