import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"], // ✅ require को required किया
        unique: true,
        lowercase: true // ✅ lowerCase को lowercase किया
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    role: {
        type: String,
        enum: ['custmore', 'seller', 'admin'],
        default: "custmore",
    },
    isVerfied: {
        type: Boolean,
        default: false, // ✅ dafault को default किया
    },
    avatar: {
        type: String,//third party url
        default: false,
    },
    verificationToken: {
        type: String,
        select: false,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    restPasswordToken: {
        type: String,
        select: false,
    }
}, { timestamps: true });

// ✅ Arrow function हटाकर normal function() लगाया ताकि this काम करे
userSchema.pre('save', async function () {
    if (!this.isModified("password")) return ;
    
    this.password = await bcrypt.hash(this.password, 12); // ✅ यहाँ await लगा दिया
    
});

// ✅ यहाँ भी methods में normal function() का यूज़ किया ताकि this.password मिल सके
userSchema.methods.comparingPassword = async function (clearTextPassword) {
    return await bcrypt.compare(clearTextPassword, this.password);
};

export default mongoose.model("User", userSchema);