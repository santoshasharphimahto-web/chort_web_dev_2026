import mongoose from "mongoose";

const teambroadCasterSchema=new mongoose.Schema({
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"team",
        required:[true,"teamId is required"]
    },
    broadCasterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"broadCaster",
        required:[true,"broadCasterId is required"]
    }
},{timeStamps:true})
teambroadCasterSchema.index({teamId:1,broadCasterId:1},{unique:true})
export default mongoose.model("teambroadCaster",teambroadCasterSchema);
