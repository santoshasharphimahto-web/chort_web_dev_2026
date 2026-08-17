import mongoose from "mongoose";

const teamSchema=new mongoose.Schema({
    name: {
    type:String,
    required:[true,"team name is required"],
    trim:true,
    minlength:2,
    maxlength:100
    },
    OwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner",
        required:[true,"OwnerId is required"]
    }

},{timeStamps:true})
export default mongoose.model("team",teamSchema);