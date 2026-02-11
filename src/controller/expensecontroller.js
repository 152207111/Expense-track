import expensemodel from "../model/expensemodel.js";
import mongoose from "mongoose";
import usermodel from "../model/usermodel.js";

const storeexpense = async (req, res) => {
  const { description, amount } = req.body;
  if (!description || !amount) {
    return res.status(400).json({ message: "All field required" });
  }
  const user = await usermodel.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const addexpense = await expensemodel.create({
    userId: req.userId,
    userEmail: user.email,
    description,
    amount
  });
  res.redirect('/');

}

export default storeexpense;