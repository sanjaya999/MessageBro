import { Router } from "express";
import {
  registerUser,
  loginUser,
  userNamefind,
  findUser,
  getallUsers,
} from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/find/:userId").get(findUser);
router.route("/findall").get(getallUsers);
router.route("/search").post(userNamefind);

export default router;
