import mongoose from "mongoose";
const broadCasterSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"  broadCaster name is required"],
        trim:true,
        minlength:2,
        maxlength:100
    },
},{timeStamps:true})
export default mongoose.model("broadCaster",broadCasterSchema);