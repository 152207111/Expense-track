import usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";
import Env from "../config/envconfig.js";
import jwt from "jsonwebtoken";


const userregister = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ message: "all field required" });

    }
    if (password != confirmpassword) {
        return res.status(400).json({ message: "Doesnot match password" });

    }
    const user = await usermodel.findOne({ email: email });
    if (!user) {

        const hashpassword = await bcrypt.hash(password, 10);
        const createuser = await usermodel.create({
            name: name,
            email: email,
            password: hashpassword
        })

        if (!createuser) {
            return res.status(300).json({ message: "User not created" });
        }

        res.redirect("/login");
    }
    else {
        return res.status(409).json({ message: "User already exist got to login page" });
    }
}

const userlogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "all field required" });
    }
    const user = await usermodel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ message: "Email not matched" });
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
        return res.status(400).json({ message: " password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, Env.JWT_SECRET_KEY, { expiresIn: "1D" });

    if (!token) {
        return res.status(500).json({ message: "Token generation failed" });
    }
    res.cookie("token", token, {
        httpOnly: true,       // cannot access via JS (more secure)
        maxAge: 24 * 60 * 60 * 1000 // 1 day in ms

    });


    res.redirect('/');
}



export { userregister, userlogin };