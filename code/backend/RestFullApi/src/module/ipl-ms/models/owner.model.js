// import { required } from "joi";
import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company:{
    type:String,
    required:[true,"company name is required"],
    trim:true,
    minlength:2,
    maxlength:100
  },
  
},{timeStamps:true})

export default mongoose.model("Owner", ownerSchema);