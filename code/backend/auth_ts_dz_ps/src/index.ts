import { createServer } from "node:http";
import { createApplication } from './app/index.js';

async function Main() {
    try {
        // createApplication ko call () karna zaroori hai taaki express app instance mile
        const app = createApplication(); 
        const server = createServer(app);
        
        const port: number = 8080;
        
        server.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error aa gaya hai:", error);  
        throw error;
    }
}

Main();