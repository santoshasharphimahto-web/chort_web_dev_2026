import express from "express"
import Router from "./auth/auth.router.js"

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/auth",Router);

export default app