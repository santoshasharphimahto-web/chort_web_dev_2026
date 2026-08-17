import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { signupPayload, signinPayload } from './model.js'
import type { Request, Response } from 'express'
import { usersTable } from '../../db/schema.js'
import { createHmac, randomBytes } from 'node:crypto'
import { generateToken, verifyToken } from './utils/jwt.miidle.js'

export class AuthController {
   public async handleSignup(req: Request, res: Response) {
      const validationResult = await signupPayload.safeParseAsync(req.body)
      if (validationResult.error) {
         return res.status(400).json({
            message: 'validation failed',
            error: validationResult.error.issues,
         })
      }

      const { email, lastName, firstName, password } = validationResult.data
      const existing = await db.select().from(usersTable).where(eq(usersTable.email, email))
      if (existing.length > 0) return res.status(400).json({ message: `user with email ${email} already exists` })

      const salt = randomBytes(32).toString('hex')
      const hashPassword = createHmac('sha256', salt).update(password).digest('hex')
      const [result] = await db.insert(usersTable).values({
         firstName,
         lastName,
         email,
         password: hashPassword,
         salt,
      }).returning({ id: usersTable.id })

      return res.status(201).json({ message: 'user has been created', data: result?.id })
   }

   public async handleSignin(req: Request, res: Response) {
      const validationResult = await signinPayload.safeParseAsync(req.body)
      if (validationResult.error) {
         return res.status(400).json({
            message: 'validation failed',
            error: validationResult.error.issues,
         })
      }

      const { email, password } = validationResult.data
      const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))
      if (!user) return res.status(400).json({ message: 'invalid email/password' })

      const salt = user.salt
      if (!salt) return res.status(500).json({ message: 'server error: missing salt' })
      const hash = createHmac('sha256', String(salt)).update(password).digest('hex')
      if (user.password !== hash) return res.status(400).json({ message: 'invalid credentials' })

      const token = await generateToken({ id: String(user.id) })
      return res.status(200).json({ message: 'user logged in', data: { token } })
   }
}