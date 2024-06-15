import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
const server = http.createServer(app);

const io = new Server(server);

app.use(express.json({limit : "20kb"}))

app.use(express.urlencoded({extended: true , limit:"16kb" }))


app.use(express.static("public"))

app.use(cookieParser())

import router from "./routes/user.routes.js"

app.use("/api/v1/user",router)




export {app}