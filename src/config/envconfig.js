import dotenv from "dotenv";
dotenv.config();

const Env={
    port:process.env.PORT_NUMBER,
    DB_URL:process.env.MONGO_DB,
    JWT_SECRET_KEY:process.env.JWT_KEY

}

export default Env;