import Env from "./envconfig.js";
import mongoose from "mongoose";
const dbconnection=async()=>{
await mongoose.connect(Env.DB_URL).then(()=>{
    console.log("Db connection success");
}).catch((error)=>{
    console.log("Db failed");
})
}

export default dbconnection;