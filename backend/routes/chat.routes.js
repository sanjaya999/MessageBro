import { Router } from "express";
import { createChat ,findUserChats,findChats} from "../controllers/chat.controller.js";





 const crouter = Router();







crouter.route("/createchat").post(createChat);
crouter.route("/finduserchat/:userId").get(findUserChats);
crouter.route("/findchat/:firstId/:secondId").get(findChats);

export default crouter