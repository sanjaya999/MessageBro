import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    userName :{
        type : String,
        required : true,
        trim : true,
        index : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },

    password : {
        type : String,
        required : [true , "Password is required"]
    },

    profile : {
        type : String,
    },

    isAdmin: {
        type: Boolean,
        default: false 
    },
    
    isApproved: { type: Boolean, 
        default: false },

    refreshToken : {
        type : String,
    },
},
{
    timestamps: true
})

//encrypt password with bcrypt
userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,5)
    }
    else{
        next();
    }
})

//compare encrypted password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        fullName : this.fullName,

    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User = mongoose.model("User" , userSchema)