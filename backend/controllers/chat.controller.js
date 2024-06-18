import { chatModel } from "../models/chat.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const createChat = asyncHandler(async(req,res)=>{
    const {firstId , secondId} = req.body;
    console.log("firstid" , firstId);
    console.log("secondid" , secondId);
    if (!firstId || !secondId) {
        throw new ApiError(400, "Both firstId and secondId are required");
    }

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId , secondId]}
        })
        
        if(chat){
            return res.status(200).json(
                new ApiResponse(200, chat)
            )
        }
            const newChat = new chatModel(
                {members: [firstId , secondId]}
            )
        

        const response = await newChat.save();
        res.status(200).json(new ApiResponse(200,response,"chat created"))
    } catch (error) {
        throw new ApiError(401, "createchat error")
    }
})


const findUserChats = asyncHandler(async(req , res)=>{
    const userId = req.params.userId
    try {
        const chat = await chatModel.find({
            members: {$in: [userId]}
        })

        res.status(200).json( new ApiResponse(200,chat,"chat retrieved"))
    } catch (error) {
        throw new ApiError(401, "find chat error")

    }
})



const findChats = asyncHandler(async(req , res)=>{
    const {firstId , secondId} = req.params;
    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId , secondId]}
        })

        res.status(200).json(new ApiResponse(200,chat,"chat retrieved"))
    } catch (error) {
        throw new ApiError(401, "find chat error")

    }
})


export {findChats,createChat,findUserChats}
