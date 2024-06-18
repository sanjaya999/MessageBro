import { messageModel } from "../models/message.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createMessage = asyncHandler(async(req,res)=>{
    const {chatId , senderId , text}= req.body
    

    const message = new messageModel({chatId , senderId , text})
    console.log(message);

    try {
       const response =  await message.save()
            res.status(200).json(new ApiResponse(200 , response,"messagecreated"))
    } catch (error) {
        throw new ApiError(401, "createMessage error")
    }
})


const getMessage = asyncHandler(async(req , res)=>{
    const {chatId} = req.params;

    try {
        const response = await messageModel.find({chatId})
        res.status(200).json(new ApiResponse(200,response,"chat retrieved"))
    } catch (error) {
        throw new ApiError(401, "getMessage error")

        
    }
})

export {createMessage,getMessage}