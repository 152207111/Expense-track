import Router from "express";
import storeexpense from "../controller/expensecontroller.js";
import auth from "../middleware/auth.js";

const expenserouter=Router();
expenserouter.post('/storeexpense',auth,storeexpense);

export default expenserouter;