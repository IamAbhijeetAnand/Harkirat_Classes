//Creating the backend of a todo app

//1.npm init -y
//2. npm i express mongoose
//3.Create the skeleton of 4 routes
//POST /signup
//POST /login
//POST /todo (authenticated)
//GET /todos (authenticated)

const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./database"); //Here we are importing something from database.js file

const jwt = require("jsonwebtoken");
const JWT_SECRET = "abhijeetanand";



const app = express();

//As we are parsing the body so we can only parse the body when we use (express.json()); middleware
//Without this we cannot parse the body -> as we are writting req.body
app.use(express.json());

app.post("/signup", async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        //const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields required" });
        }

        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password too short" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        res.status(200).json({
        message: "User created and logged in"
    })
    }
    catch (err) {
        res.status(400).json({ message: "Email already exists" });
    }

    

});

app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    //const { email, password } = req.body;

    //Now we have to read in DB that is there any user with this email and password
    //And how do we do this
    const user = await UserModel.findOne({
        email: email.toLowerCase().trim()
    })
    if (!user) {
        return res.status(403).json({
            message: "Invalid Credentials or user does not exist"
        });
    }


    //If the user exists then we will create a token for them and return them a token
    //This token what we send them will help us in further authentication
    //How did we generate a token??->Using jsonwebtoken(JWT) -> npm i jsonwebtoken -> const jwt=require(jsonwebtoken); imported  at the top
    // if(user) {
    //     const token=jwt.sign({
    //         //we are creating the token using the user id
    //         id: user._id.toString() //As we are using user id for creating token but the user id is an objectId(object of a class) so we are converting it into a string
    //     },JWT_SECRET);
    //     res.json({
    //         message:"You are logged in",
    //         token:token
    //     });
    // } else {
    //     res.status(403).json({
    //         message:"Incorrect Credentials"
    //     })
    // }


    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
    )
    res.json({ token: token });
})

//Auth Middleware as the below routes are only for authenticated users only

function auth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData) {
        req.userId = decodedData.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You need to sign in first! OR Invalid token"
        })
    }
}

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const description = req.body.description;
    if (!description || description.trim() === "") {
        return res.status(400).json({ message: "Description required" });
    }

    const todo = await TodoModel.create({
        description,
        userId: req.userId
    });

    res.json(todo);
});

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId: userId
    })

    res.json({
        todos
    })
});

app.put("/todo/:id", auth, async function (req, res) {
    const todoId = req.params.id;

    await TodoModel.updateOne(
        { _id: todoId, userId: req.userId },
        { done: true }
    );

    res.json({ message: "Todo marked as done" });
});

app.listen(3000);

//Improvements that we had done
//1.Password is nor hashed -> Hashed the password using the "bcrypt"
//2.Duplicate email crash the whole app
//3.Added more endpoints(mark todo as done)
//4.Added the timestamps (createdAt / dueDate)
//5. Relationships in Mongo (User ↔ Todos)
//6. Added validations (email & password format)