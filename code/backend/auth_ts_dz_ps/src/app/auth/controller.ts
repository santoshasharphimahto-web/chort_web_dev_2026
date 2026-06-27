import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import {singinPayload,singupPayload} from './model.js'
import type {Request,Response} from 'express'
import { usersTable } from '../../db/schema.js'
// import { restart } from 'nodemon'
import { createHash, createHmac, randomBytes } from 'node:crypto'
// import { hex } from 'zod'
import {generateToken,verifyToken} from './utils/jwt.miidle.js'


 export class AuthController{

    public async handleSingin(req:Request,res:Response){
    // after zod valiadatio
    // extarct data email ,name..
    //if !exists -res send karo userko
    //password -hash formate me ,with slat 
    //creat a usre in table  

     const validationResult= await singinPayload.safeParseAsync(req.body)
     if(validationResult.error){
       return res.status(400).json({
        message:"validation failed ho gye hai",
        error:validationResult.error.issues
    })

     }
     const {email,lastName,firstName,password}=validationResult.data
     const userEmail=await db.select().from(usersTable).where(eq(usersTable.email,email))
     if(userEmail.length>0) return res.status(400).json({message:`user with this ${email} all redy Exits`})
     const salt=randomBytes(32).toString('hex');  
     const hashPassword=createHmac('sha256', salt).update(password).digest('hex')
     const [result]= await db.insert(usersTable).values({
        firstName,
        lastName,
        email,
        password:hashPassword,
        salt,
     }).returning({id:usersTable.id})
     
     return res.status(201).json({message:"user has benn created",data:result?.id})

    }

    public async handleSingup(req:Request,res:Response){
      // validate a data with dto
      // extarct email/password
      //check exist or not
      //check passwor wit hash with salt
      // crteate a token 
      // and send it to user 
      const validationResult=await singupPayload.safeParseAsync(req.body);
      if(validationResult.error) {
         return res.status(404).json({
            message:"validation Failed",
            error:validationResult.error.issues

         }) 
      
      const {email,password} = validationResult.data ! 
      const [user]= await db.select().from(usersTable).where(eq(usersTable.email,email))
      if(!user) return res.status(400).json({message:"invlid pass/email"})
      const salt=user?.salt!;
      const hash=createHmac('sha256', salt).update(password).digest('hex')

      if(user?.password!==hash){
         return res.status(400).json({message:"ivalid Credentials"})
      }
      // cgehreate a token 
      const token=  generateToken({id:user?.id!})
      res.status(201).json({message:"user login",data:{token}})
      }

    } 
}