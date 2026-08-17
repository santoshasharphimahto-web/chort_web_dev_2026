import mongoose from "mongoose";

const playerSchema=new mongoose.Schema({
    name: {
    type:String,
    required:[true,"player name is required"],
    trim:true,
    minlength:2,
    maxlength:100
    },
    role:{
        type:String,
        enum:["batsman","bowler","allrounder","wicketkeeper"],
        message:"role must be one of: batsman, bowler, allrounder, wicketkeeper",
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"team",
        required:[true,"teamId is required"]
    },
},{timeStamps:true})

export default mongoose.model("player",playerSchema);