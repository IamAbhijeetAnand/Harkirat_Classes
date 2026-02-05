const express=require("express");
const app = express();

app.use(express.json());

const users=[];

//Function to generate random token
function generateToken() {
    let options = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'
    ];

    let token = "";

    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }

    return token;
}


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
        const token = generateToken();
        foundUser.token=token; //This line do that in the global array not just only store username and password 
                               //But also the generated token for that specific 
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
    const token = req.headers.token;
    let foundUser=null;

    for(let i=0;i<users.length;i++) {
        if(users[i].token==token) {
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