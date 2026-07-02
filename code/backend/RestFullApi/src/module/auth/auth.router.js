import { Router } from "express";
import *as controller from "./auth.controller.js"
import validateData from "../../common/middleware/validaeteMiddle.js";
import registerDto from "./authdto/register.dto.js"
import {authme,roleBaseAccesaced} from "./auth.middleware.js"
import loginDto from "./authdto/login.dto.js";

const router=Router();
router.post('/register',validateData(registerDto),controller.register)
router.post('/login',validateData(loginDto),controller.login)
router.post('/refreshToken',controller.refresh)
router.post('/logout',authme,controller.logOut)
router.post('/verifyUser/:token',controller.verifyUser)
router.get('/me',authme,controller.getMe)
router.post('/forgetPassword',controller.forgetPassword)
router.post('/newPassword/:token',controller.newPassword)
export default router