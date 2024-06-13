import express from "express";
import { Server, Server, Server } from "socket.io";


const app = express();
const Server = new Server();

app.get("/" , (req,res)=>{
    res.send("server is ready");
});

const port = process.env.PORT || 3000

app.listen(port , ()=>{
    console.log("server is ready at 3000")
});