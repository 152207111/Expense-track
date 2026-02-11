import {userregister,userlogin} from "../controller/usercontroller.js";
import Router from "express";

const userrouter=Router();
userrouter.post('/register',userregister);
userrouter.post('/login',userlogin);

export default userrouter;