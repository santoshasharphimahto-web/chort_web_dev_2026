import app from "./src/module/app.js";
import "dotenv/config"
import connectDB from "./src/common/db/dbConnection.js";
// import { server } from "typescript";

const start=async ()=>{
    await connectDB()
    app.listen(process.env.PORT,()=>{
        console.log(`aerver is running at ${PORT}in ${process.env.DEPLOYMENT_MODE}`)

    })

}
start().catch((err)=>{
    console.log("failed to start server")
    process.exit(1)
})