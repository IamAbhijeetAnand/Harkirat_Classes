//Creating a Simple HTTP server


//TO run this in terminal write node index.js
//And after that search on the localhost:3000 or 127.0.0.1:3000 both are same
const express= require("express");
const app = express()  //Creating a fresh instence of express as app

//Route Handlers

//Route
//GET method
app.get('/', function(req, res) {
    res.send('Hello from the root router')
    //res.send('Hello send from the same router') //This will throw an error. We cannot send the response 2 times from a single route
})

app.get('/asd', function(req, res){
    res.send('Hello from the asd router')
})
app.listen(3001) //Which port you want to listen