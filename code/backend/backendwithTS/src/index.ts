import http from 'node:http';
import {env} from "./env.js";
import {creatServerapp} from "./app/index1.js"

function Main(){
    try{
   const server= http.createServer(creatServerapp())
   console.log(server)
   const PORT:number=env.PORT?+ env.PORT:8080
   server.listen(PORT,()=>{
    console.log(`Server is running on the ${PORT}`)
   })
    }catch(error){
console.log(error)
    }
}
Main()
   