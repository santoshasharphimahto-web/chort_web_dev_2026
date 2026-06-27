import express from "express";
import type { Express, Request, Response } from "express";
import {authRouter} from './auth/routes.js'

export function createApplication(): Express {
    const app: Express = express();

    // Middleware
    app.use(express.json()); // Ek basic JSON middleware add karna hamesha sahi rehta hai
    app.use('/auth',authRouter)

    // Routes
    // app.get('/', (req: Request, res: Response) => {
    //     return res.json({ message: "Welcome to the ChaiCode Server" });
    // });

    return app;
}