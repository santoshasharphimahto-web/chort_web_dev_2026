import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength:2,
        maxlength:50,
        required:[true,"Name is required"]

    },
    email:{
        type:String,
        trim:true,
        require:[true,"Email is required"],
        unique:true,
        lowerCase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false

    },
    role:{
        type:String,
        enum:['custmore',"seller","admin"],
        default:"custmor",
    },
    isVerfied:{
        type:Boolean,
        dafault:false,


    },
    verificationToken:{
        type:String,
        select:false,
    },
    refreshToken:{
      type:String,
      select:false,
    },
    restPasswordToken:{
        type:String,
        select:false,
    },
    restPasswordExpires:{
        type:Date.now(),
        select:false
    },
 

},{timestamps:true})

export default mongoose.model("User",userSchema)