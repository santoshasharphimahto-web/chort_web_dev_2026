import {createServer} from "node:http";
import {createApplication} from './app/index.js'
import type {Response,Request} from 'express'
async function Main() {
   
    try{
        const server= createServer(createApplication)
        const port:number=8080;
        server.listen(port,()=>{
            console.log(`server is running at this ${port}`);
        })
    }catch(error){
      console.log("errroe agye hai")  
      throw error
    }
    
}

Main()


