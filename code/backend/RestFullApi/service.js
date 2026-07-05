import app from "./src/module/app.js";
import "dotenv/config"
import connectDB from "./src/common/config/dbConnection.js";
// import { server } from "typescript";

const start=async ()=>{
    await connectDB()
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at ${process.env.PORT}in ${process.env.DEPLOYMENT_MODE}`)

    })

}
start().catch((err)=>{
    console.log("failed to start server",err)
    process.exit(1)
})