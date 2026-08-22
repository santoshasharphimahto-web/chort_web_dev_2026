import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import {Server} from "socket.io";
import dotenv from "dotenv";
import type {Request,Response} from 'express'

dotenv.config();

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

function main() {
    const app = express();
    const server = http.createServer(app);
    const port= process.env.PORT || 3000;
    const io = new Server(server);

    io.on('connection',(socket)=>{
        console.log("a new connection is connected ",socket.id);
        socket.on('user:message',(data)=>{
            console.log("message from the socket",data)
                    socket.broadcast.emit('server:message',data)
        })
        socket.on('user:typing',(data)=>{
            console.log(data)
            socket.broadcast.emit('server:typing',data)

        })

    })


    
    // const publicDirectory = path.resolve(__dirname, "../public");
    app.use(express.static(path.resolve('./public')));

    

    
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

main();