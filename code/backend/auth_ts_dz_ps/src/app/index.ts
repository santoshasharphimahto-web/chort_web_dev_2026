import  express  from "express";
import type {Express,Response,Request} from 'express'


export function createApplication():Express{
    const app=express()
    //middle Ware
    //Routes
    app.get('/',(req,res)=>{
        return res.json({message:"welcome to the ChaiCode Server "})
    })

    return app

    
}