import express from "express";
import type{Application} from "express";
import todoroute from "./todo/route.js"

 export function creatServerapp():Application{
    const app=express();
    app.use(express.json())
    app.use("/todo",todoroute)
    return app;

}