import mongoose from "mongoose";

const connectDB=async ()=>{
   const connect= mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log(connect)
   console.log(`mongo db is hosted at ${connect.Connection.host}`)
}
export default connectDB