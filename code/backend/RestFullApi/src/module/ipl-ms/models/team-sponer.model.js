import mongoose from "mongoose";

const teamSponserSchema=new mongoose.Schema({
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"team",
        required:[true,"teamId is required"]
    },
    sponserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sponser",
        required:[true,"sponserId is required"]
    }
},{timeStamps:true})
teamSponserSchema.index({teamId:1,sponserId:1},{unique:true})
export default mongoose.model("teamSponser",teamSponserSchema);
