import mongoose from "mongoose";

const expensschema=new mongoose.Schema(
    {
    userId:{
        type:String,
        required:true
    },
      userEmail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
           type:Number,
        required:true
    }
});

const expensemodel=new mongoose.model("userexpense",expensschema);

export default expensemodel;