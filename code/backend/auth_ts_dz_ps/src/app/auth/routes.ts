import { Router } from 'express'
import { AuthController } from './controller.js'

const authController = new AuthController()

export const authRouter: Router = Router()
authRouter.post('/signin', authController.handleSignin.bind(authController))
authRouter.post('/signup', authController.handleSignup.bind(authController))
