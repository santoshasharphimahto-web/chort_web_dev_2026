import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'node:path';
import kafkaClient from './kafka-client.js';

function main(){
    const app = express();
    const port = process.env.PORT?? 3000;
    const server = http.createServer(app);
    const io = new Server(server);
    const producer=kafkaClient.producer();
    await producer.connect();
    const kafkaConsumer=kafkaClient.consumer({groupId:`socket server:${port}`})
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({topic:'location-Update', fromBeginning:true})
    await kafkaConsumer.run({
        eachMessage: async({topic, partition, message, heartbeat})=>{
            const data=JSON.parse(message.value.toString())
            console.log(`Received message from topic ${topic}:`, data);
            io.emit('server:location:update', {id:data.id, lat:data.latitude, lng:data.longitude});
            await heartbeat()
        }
    })
    io.on('connection',async(socket)=>{
        console.log(`[socket is ${socket.id} is connected...}]`);
        socket.on('client:location:update', (data)=>{
            console.log(`Received location update from client ${socket.id}:`, data);
           await producer.send({
                topic: 'location-Update',
                messages: [{ value: JSON.stringify({ id: socket.id, latitude: data.lat, longitude: data.lng }) }]
           })

        })
    })
     app.use(express.static(path.resolve('public')));
    app.get('/health', (req, res) => {
        res.send('Health check passed');
    });
    

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
main();