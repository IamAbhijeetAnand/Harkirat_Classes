//Create a backend serverin node.js, that returns the sum endpoint
//Create an HTML file, that hit the backend server using 'fetch' api

const express = require("express");

const app = express();

//app.use(cors()); // ✅ allow cross origin
app.use(express.json()); // ✅ to read req.body

app.post("/sum", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const sum = a+b;
    res.json({
        answer:sum
    })
})  

app.listen(3000);