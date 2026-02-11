    import jwt from "jsonwebtoken";
import Env from "../config/envconfig.js";

const auth=(req,res,next)=>{
const token=req.cookies.token;
  if(!token){
     return res.status(401).json({ message: "Token missing" });
  }
//   const token=header.split("")[1];
  try{
    const decoded= jwt.verify(token,Env.JWT_SECRET_KEY);
    req.userId=decoded.id;
    next();
  }catch(err){
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default auth;