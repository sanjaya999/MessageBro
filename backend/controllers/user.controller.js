import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import mongoose from "mongoose";
import {User} from "../models/user.model.js"


const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return {accessToken , refreshToken}
    }
    catch(error){
        throw new ApiError(500, "sth went wrong while generating refreshtoken")

    }


}



const registerUser = asyncHandler(async(req,res) => {
    

    const {userName , email  , password}= req.body
    console.log("userName:" , userName);
    console.log("email:" , email);
       console.log("password:" , password);

        //validate if empty field 
      if(
        [userName,email,password].some((field)=>field?.trim()==="")
        ){
            throw new ApiError(400 , "All fields are required")
        }

         const existedUser =  await User.findOne({ email })

        if (existedUser){
            throw new ApiError(409 , "User already existed")

        }
        
        
      




       const user =   await User.create({
           userName ,
           
           email,
           password,
        
           newUser : true,
           

       })
       //check if use exist in database or not 
       const createdUser = await User.findById(user._id).select(
           "-password -refreshToken"
       )

       if(!createdUser){
           throw new ApiError(500 , "sth went wrong while regisering the user")
       }


       return res.status(201).json(
           new ApiResponse(200, createdUser , "User registered Successfully")
       )


   })






   const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body
    console.log(email , password)
    if (!email && !password ){
        throw new ApiError(400 , "email and password required")
    }

    const user = await User.findOne({email})
    if (!user){
        throw new ApiError(404 , "user doesnt exist")
    }


    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }


    const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")
    //cookies by default can be edited but with httponly it can only be modified by server
    const option = {
        httpOnly : true,
        // secure : true,
    }

     return res.status(200)
     .cookie("accessToken",accessToken,option)
     .cookie("refreshToken" , refreshToken,option)
     .json(
        new ApiResponse(200,{
            user : loggedInUser , accessToken , refreshToken ,
            isNewUser: user.newUser,

        },
        "user logged in successful")
     )
})


const findUser = asyncHandler(async(req , res)=>{
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId).select(
            "-password -refreshToken"
        )
        return res.status(200).json(new ApiResponse(200 , user , "these are users"))

    }catch(error){
        throw new ApiError(401, "cannot find user")
    }
})

const getallUsers = asyncHandler(async(req , res)=>{
    
    try{
        const user = await User.find().select(
            "-password -refreshToken"
        )
        return res.status(200).json(new ApiResponse(200 , user , "these are users"))

    }catch(error){
        throw new ApiError(401, "cannot find user")
    }
})


   export {registerUser , loginUser , findUser, getallUsers}