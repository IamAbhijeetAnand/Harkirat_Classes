const express = require("express");
const app = express()

let todos=[]; // Easier way to store data
//Harder way is to store the data  in a file, foundation for databases
//Add users logic  These are the assignments
//User logic Example 
let users={
    1:{
        todos:[]
    },
    2: {
        todos:[]
    }
}

app.post('/', function(req, res) {
    //Create a random id for the todo
    //Extract the  todo title from the body
    todos.push({
        tittle,
        id 
    })
})

app.delete('/', function(req, res) {
    //Extract the todo id
    //Remove the todo from here
})

app.get('/', function(req, res) {
    res.json({
        todos
    })
})

app.listen(3000)
