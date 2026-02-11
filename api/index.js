import express from "express";
import ejs from "ejs";
import userrouter from "../src/routes/userroute.js";
import expenserouter from "../src/routes/expenseroute.js";
import cookieParser from "cookie-parser";
import usermodel from "../src/model/usermodel.js"
import auth from "../src/middleware/auth.js";
import expensemodel from "../src/model/expensemodel.js";
import dbconnection from "../src/config/dbconfig.js"
// import path from "path";

const app = express();

// Set absolute path for views
app.set('views engine', ejs);
app.use(cookieParser());
app.use(express.json());
// For URL-encoded bodies (HTML forms)
app.use(express.urlencoded({ extended: true }));

app.set('view engine', "ejs");

app.get('/', auth, async (req, res) => {
    const user = await usermodel.findById(req.userId);
    if(!user){
        res.render("expense");
    }
   
    res.render('expense', { user });
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/logout', (req, res) => {
    res.cookie("token", " ", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.redirect('/login');
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/history', auth, async (req, res) => {
    const user = await usermodel.findById(req.userId);
    const expensedata = await expensemodel.find({ userEmail: user.email });

    res.render('showexpense', { expensedata, user });
});

app.use('/expense', expenserouter);

app.use('/user', userrouter);
export default app;

dbconnection();
