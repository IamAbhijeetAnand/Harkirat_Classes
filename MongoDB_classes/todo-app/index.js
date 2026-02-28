//Creating the backend of a todo app

//1.npm init -y
//2. npm i express mongoose
//3.Create the skeleton of 4 routes
    //POST /signup
    //POST /login
    //POST /todo (authenticated)
    //GET /todos (authenticated)

const express = require("express");
const {UserModel, TodoModel}= require("./database"); //Here we are importing something from database.js file

const jwt=require("jsonwebtoken");
const JWT_SECRET="abhijeetanand";



const app  = express();

//As we are parsing the body so we can only parse the body when we use (express.json()); middleware
//Without this we cannot parse the body -> as we are writting req.body
app.use(express.json());

app.post("/signup", async function(req, res) {
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    await UserModel.create({
        email:email,
        password:password,
        name: name
    })
    res.json({
        message:"You are  logged in"
    })
});

app.post("/signin", async function(req,res) {
    const email=req.body.email;
    const password=req.body.password;

    //Now we have to read in DB that is there any user with this email and password
    //And how do we do this
    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user);

    //If the user exists then we will create a token for them and return them a token
    //This token what we send them will help us in further authentication
    //How did we generate a token??->Using jsonwebtoken(JWT) -> npm i jsonwebtoken -> const jwt=require(jsonwebtoken); imported  at the top
    if(user) {
        const token=jwt.sign({
            //we are creating the token using the user id
            id: user._id.toString() //As we are using user id for creating token but the user id is an objectId(object of a class) so we are converting it into a string
        },JWT_SECRET);
        res.json({
            message:"You are logged in",
            token:token
        });
    } else {
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
})

//Auth Middleware as the below routes are only for authenticated users only

function auth(req, res, next) {
    const token = req.headers.token;

     if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }   

    const decodedData = jwt.verify(token,JWT_SECRET);
    if(decodedData) {
        req.userId=decodedData.id;
        next();
    }
    else {
        res.status(403).json({
            message:"You need to sign in first! OR Invalid token"
        })
    }
}

app.post("/todo",auth, function(req, res) {
    const userId=req.userId;
    const description=req.body.description;

    TodoModel.create({
        description,
        userId
    })
    res.json({
        userId:userId
    })
})

app.get("/todos",auth, async function(req, res) {
    const userId=req.userId;
    const todos=await TodoModel.find({
        userId: userId
    })

    res.json({
        todos
    })
})

app.listen(3000);



//What is bearer in auth middleware di research as well
//Also what is req.headers.authorization