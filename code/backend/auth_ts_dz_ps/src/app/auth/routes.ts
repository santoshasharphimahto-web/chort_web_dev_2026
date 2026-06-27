import {Router} from 'express'
import {AuthController} from "./controller.js"

const authControler=new AuthController


export const authRouter:Router=Router()
authRouter.post('/singin',authControler.handleSingin.bind(authControler))
authRouter.post('/singup',authControler.handleSingup.bind(authControler))
