import mongoose from "mongoose";
const sponserSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"sponser name is required"],
        trim:true,
        minlength:2,
        maxlength:100
    },
},{timeStamps:true})
export default mongoose.model("sponser",sponserSchema);