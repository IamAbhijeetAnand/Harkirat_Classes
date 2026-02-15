const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");


const JWT_SECRET = "abhijeet123";

const app = express();
app.use(express.json()); //This middleware will let you extract json body from the request

const users = [];

//Logger Middleware
function logger(req, res, next) {
    console.log(`${req.method} request came`);
    next();
}


//This will avoid some complexivity CORS
//Host FE and BE on the same port 
//localhost:3000
app.get("/", function (req, res) {
    //res.sendFile("./public/index.html");
    //__dirname holds your current directory
    //Is a golbal variable which has a current directory
    //You need to require const path = require("path"); at the top
    res.sendFile(path.join(__dirname, "public", "index.html")
    );
})

app.post("/signup", logger, function (req, res) {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password: password
    })

    //We should check if the user with this username exist or not

    res.status(200).json({
        message: "Congratulation! you are sugned in"
    })
})

app.post("/signin", logger, function (req, res) {
    const username = req.body.username
    const password = req.body.password

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i];
            break;
        }
    }
    if (!foundUser) {
        res.json({
            message: "Incorrect Credentials!"
        })
        return
    }
    else {
        const token = jwt.sign({
            username
        }, JWT_SECRET);


        //How to send jwt in res header
        res.header("jwt", token);
        //res.header("random", "Abhijeet"); 

        //1️⃣ Send JWT (correct & useful)
        // res.header("jwt", token);

        // 2️⃣ Send random text (for testing)
        // res.header("random", "Abhijeet");

        // 3️⃣ Send variable value
        // const name = "Abhijeet";
        // res.header("random", name);


        res.json({
            message: "Yess! You signed in!!!",
            token: token
        })

    }
})


//Auth Middleware
function auth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }
    const decodedData = jwt.verify(token, JWT_SECRET);
    //const decodedData=jwt.decode(token); //You should always use jwt.verify() insted of jwt.decode() because if you use .decode() for athenticated route then it will be not good for the securuty reason

    if (decodedData.username) {

        //How to use the req to pass the data to the next function
        //Answer
        //req={status, headers,....,username,password,userFirstName}
        //After this whoever the next will grt this updated req object
        //You can populate various keys on the req object
        //But do not overwrite the status,headers these things . Other you can overwrite

        //Middleware can modify in req, res objects so the next line doing this
        //Or we can say we are passsing some data which will be used by other endpoints
        req.username = decodedData.username;
        next()
        //next("username")
        //You can think whatever we sent as an argument in next function, will not automatically be given to next endpoint which will be called
        //But this next function is called by you is calling another function

        //So the one any only way to send data from one middleware to the next function/endpoint/handler os by using the req object and modifying the req oblect 
    }
    else {
        return res.json({
            message: "You are not logged in"
        })
    }
}


//Anyone one who want to hit the authenticated router, must have to provide the matched token
app.get("/get-Password", logger, auth, function (req, res) {
    //As we had sending username from the Auth middleware. So, we do not need to decodet the data and store it in username variable
    //We already decoded the data in auth middleware and send or modifyed the data for all the handlers
    //So to find the username fron the req.username rather than from below code
    //const token=req.headers.token;
    //const decodedData=jwt.verify(token,JWT_SECRET);
    //const currUser=decodedData.username;

    const currUser = req.username;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === req.username) {
            foundUser = users[i];
            break;
        }
    }
    if (foundUser) {
        res.status(200).json({
            username: foundUser.username,
            password: foundUser.password
        })
    }
})

app.get("/allTodos", logger, auth, function (req, res) {

})

app.post("/createTodo", logger, auth, function (req, res) {

})

app.delete("/deleteTodos", logger, auth, function (req, res) {

})

app.listen(3000);
