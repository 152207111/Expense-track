import app from "./main.js";
import Env from "./config/envconfig.js";
import dbconnection from "./config/dbconfig.js";

app.listen(process.env.PORT_NUMBER, () => {
    console.log("server is running on port " + process.env.PORT_NUMBER);
});

dbconnection();