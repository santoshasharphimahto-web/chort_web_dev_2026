import {TodoSchema} from "../validate/todo.schema.js"
import type {Todo} from "../validate/todo.schema.js"
import type { Request,Response } from "express";

 export class ToDo{
    private _db:Todo[];
    constructor(){
        this._db=[]
    }
    public getallTodo(req:Request ,res:Response){
    const todo=this._db; 
    res.status(101).json({todo});
   
    }

    public async setTodo(req:Request,res:Response){
        try{
        const unvalidated=req.body;
        const validated= await TodoSchema.parseAsync(unvalidated)
        this._db.push(validated);

        }catch(error){
         console.log(error)
        }
    }

}