import mongoose, { Schema } from "mongoose";

const chatSchema =  new Schema({
    members : Array,

},
{
    timestamps: true,
}
);


 export const chatModel = mongoose.model("Chat" , chatSchema)
