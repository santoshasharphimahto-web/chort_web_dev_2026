import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'node:path';

function main(){
    const app = express();
    const port = process.env.PORT?? 3000;
    const server = http.createServer(app);
    const io = new Server(server);
     app.use(express.static(path.resolve('public')));
    app.get('/health', (req, res) => {
        res.send('Health check passed');
    });
    

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
main();