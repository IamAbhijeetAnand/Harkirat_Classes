const express=require("express");
const jwt = require("jsonwebtoken");

//Creating a JWT_SECRET variable
const JWT_SECRET="randomabhijeet"
const app = express();

app.use(express.json());

const users=[];

//Function to generate random token no longer need as we are using JWT
// function generateToken() {
//     let options = [
//         'a','b','c','d','e','f','g','h','i','j','k','l','m',
//         'n','o','p','q','r','s','t','u','v','w','x','y','z',
//         'A','B','C','D','E','F','G','H','I','J','K','L','M',
//         'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
//         '0','1','2','3','4','5','6','7','8','9'
//     ];

//     let token = "";

//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }

//     return token;
// }


app.post("/signup",function(req, res) { 
    //1st->You wil parse the data that comes
    const username=req.body.username;
    const password=req.body.password;

    //And then push that data into the in memory variable
    users.push({
        username:username,
        password:password
    })
    //Now send the response message after storing the data
    res.json({
        message:"You are signed Up"
    })
    console.log(users);
})

//Another way to write the same thing
// function signupHandler(req, res) {

// }
// app.post("/singnup",signupHandler); //Anytime this route will be called then signinHandler fxn will be called
//If you want you can write signupHandler in another folder and cal it here to make your project more readable

app.post("/signin", function(req, res) { //Anytime /signin route will called then function will be called

    const username = req.body.username;
    const password = req.body.password;

     //Maps anf filter -> Must study to understand this
    //  const  fondUser=users.find(function(u) {
    //     if(u.username==username && u.password==password) {
    //         return true;
    //     }
    //     else {
    //         return false
    //     }
    //  })

    //Or else you can write this 
    //Both will work same

    let foundUser=null; //In the users array this foundUser variable is that specificinstance of that user
    for(let i=0;i<users.length;i++){
        if(users[i].username==username && users[i].password==password) {
            foundUser=users[i];
            break;
        }
    }

    if(foundUser) {
        //Convert their username over to a jwt to do this we have a libray jsonwebtoken
        //Install it and Import it on the top as const jwt=require("jsonwebtoken")
        //And then you can use few function of this jwt library
        //Such as jwt.sign()  -> This is what creates the token 
        const token=jwt.sign({username:username}, JWT_SECRET); //Convert this username into token using JWT_SECRET

        //foundUser.token=token;  //We do not need to store this token into the DB now because this token itself has enough details as username is encoded inside
        res.json({
            token:token
        }) 

    } else {
        res.status(403).send({
            message:"Invalid username or password"
        })
    }
    console.log(users);
});

//We could have create this using arrow function
//The syntax would be like this
// app.post("/signin",(req, res)=> {

// });


app.get("/me", (req, res) => {
    const token = req.headers.token; //The user will still send you a token it will be stil in the headers But now they will send you a jwt
    //How can you find the specific user in global variable
    //Now we have to decode the token to get the username using jwt.verify() function
    const decodedData=jwt.verify(token, JWT_SECRET);
    const inAuthDecodedData = jwt.decode(token,); //Does not require JWT_SECRET
    //We will come to know about the difference b/w them
    
    const username=decodedData.username;
    //If we just need to return the username we could have easily returned it here but as we need to retuen the password or if any other details then we need to access or check the DB
    //But as the /me endpoint require username and the password we still have to find the user in the globle variable
    //Rather than finding them on the token(users[i].token) we will find them on the username (users[i].username==username)
    let foundUser=null;

    //Here finding the user whose username is equal to the username found in the decodedData
    for(let i=0;i<users.length;i++) {
        if(users[i].username==username) {
            foundUser=users[i];
            break;
        }
    }

    if(foundUser) {
        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    } else {
        res.json({
            message:"Token Invalid"
        })
    }
})

app.listen(3000);

//npm i jsonwebtoken