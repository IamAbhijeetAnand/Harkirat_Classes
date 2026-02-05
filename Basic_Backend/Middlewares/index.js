const express = require("express");
const app = express();

//app.use(express.json());

//function that return a boolean if the age of the person is more than 14
function isOldEnough(age) {
    if (age >= 14) {
        return true;
    }
    else {
        return false;
    }
}

function isOldEnoughMIdddleware(req, res, next) {
    const age= req.query.age;
    if(age>=14) {
        next();
    }
    else {
        res.json({
            msg:"Sorry you are not of age yet!"
        })
    }
}

//If we know that all the below routes will use the certain middleware then we can use that
//THis way
//app.use(isOldEnoughMIdddleware);
//After this we do not need to write the middleware in each routes 
//Order matters in the middleware use

app.get("/ride1", isOldEnoughMIdddleware, function (req, res) {
    //if (isOldEnough(req.query.age)) {
        res.json({
            msg: "You have successfully riden the ride 1"
        })
    // } else {
    //     res.status(411).json({
    //         msg:"Sorry you are not of age yet for ride1"     //As we had created a isOldEnoughMiddleware Now we do not need any if statement
    //     })                                                                 //Or any conditions
    // }
})

//If we use the middleware here then the middleware will not check for the above routes
//app.use(isOldEnoughMiddleware);  

app.get("/ride2", isOldEnoughMIdddleware,  function (req, res) {
    //if (isOldEnough(req.query.age)) {
        res.json({
            msg: "You have successfully riden the ride 2"
        })
    // } else {
    //     res.status(411).json({
    //         msg:"Sorry you are not of age yet for ride2"
    //     })
    // }
})

app.listen(3000);