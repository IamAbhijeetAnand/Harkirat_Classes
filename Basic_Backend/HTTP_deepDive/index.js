const express = require("express");
const app = express();


//They are not dynamic->>> To make it dynamic we created below router and use params insted of .query
//Here we send values like localhost:3000/sum 
// app.get("/sum", function(req, res) {
//     const a = parseInt(req.query.a);
//     const b = parseInt(req.query.b);
//     res.json({
//         ans: a + b
//     })
// });


//Now we had to learn better routing, add database, ans middlewares

//Dymanic Routing
//So if we send localhost:3000/sum/30/40 then it will send 70
app.get("/sum/:firstArg/:secondArg", function (req, res) {
    const a = Number(req.params.firstArg);
    const b = Number(req.params.secondArg);
    res.json({
        ans: a + b
    })
});

    app.get("/multiply", function (req, res) {
        const a = Number(req.query.a);
        const b = Number(req.query.b);
        res.json({
            ans: a * b
        })
    });

    app.get("/substraction", function (req, res) {
        const a = Number(req.query.a);
        const b = Number(req.query.b);
        res.json({
            ans: a - b
        })
    });

    app.get("/divide", function (req, res) {
        const a = Number(req.query.a);
        const b = Number(req.query.b);
        res.json({
            ans: a / b
        })
    });

    app.listen(3000);
