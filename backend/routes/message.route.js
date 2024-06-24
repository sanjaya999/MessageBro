import { Router } from "express";
import {
  createMessage,
  getMessage,
} from "../controllers/message.controller.js";

const mrouter = Router();

mrouter.route("/createMessage").post(createMessage);
mrouter.route("/getmessage/:chatId").get(getMessage);

export default mrouter;
