import mongoose from "mongoose";

import dotenv from "dotenv"
import {app} from "./app.js"


dotenv.config({
    path:"./.env"
})


const db_name = "messagebro";

const connectdb = async()=>{
    try{
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        console.log(`connected to database bro ${connectionInstances}`)
    }
    catch(error){
        console.log("connection error" , error)
    }
}

connectdb().then(()=>{
    const PORT = process.env.PORT || 9000;
    app.listen(PORT || 9000, ()=>{
        console.log(`server running at port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("mongodb conn fail");
})