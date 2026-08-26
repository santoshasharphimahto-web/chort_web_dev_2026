import http from 'node:http';
import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import { publisher, subscrber,redies } from './radies-connection.ts';

import { Server } from 'socket.io';
import { stat } from 'node:fs';
import { json } from 'body-parser';
// import { stat } from 'node:fs';

// const state = {
// 	numberOfcheckbox:new Array(100).fill(false)
// }
const state_key_vale = 'key-state-value';

async function main(){
    const app=express()
    app.use(express.static(path.resolve('./public')))
    const port = Number(process.env.PORT) || 3000;
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: { origin: '*' },
	});

	
	 await 	subscrber.subscribe('redies:data')
			subscrber.on('message',(channel,message)=>{
				if(channel==='redies:data'){	
					const {index,checked}=JSON.parse(message)
					// state.numberOfcheckbox[index]=checked

					io.emit('server:checkBox',{index,checked})
					
				}
			});

	io.on('connection', async(socket) => {
		console.log(`Client connected: ${socket.id}`);
		socket.on('client:checbox:change',async(data)=>{
			console.log(data)
			const {checked,index}=data;
			const existinData=await redies.get(state_key_vale)
			if(existinData){
				const remoteData=JSON.parse(existinData)
				remoteData[index]=checked
				await redies.set(state_key_vale,JSON.stringify(remoteData))
			}else{
				const remoteData = new Array(100).fill(false)
				remoteData[index] = checked
				await redies.set(state_key_vale,JSON.stringify(remoteData))

			}

			// state.numberOfcheckbox[index]=checked;
			 await publisher.publish('redies:data',JSON.stringify({index,checked}))
			

			})


		})

	app.get('/health', (req: Request, res: Response) => {
		res.status(200).json({ healthy: true });
	});
	app.get('/state', async(req,res)=>{
	   const existingData= await redies.get(state_key_vale)
	   if(existingData){
		res.json({
		  numberOfcheckbox:JSON.parse(existingData)
		})
	   }else{
		res.json({
		  numberOfcheckbox:new Array(100).fill(false)

		})
	   }
	})

	server.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
}

main();