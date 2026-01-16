//Creating an http server
//Using Exoress
//Is Express is a node default libray -> NO, But fs library is a node defalut library 
//So we need to install Express  ->> npm i express


const express = require("express");

const app = express();

function sum(a){
    let ans=0;
    for(let i=0;i<a;i++) {
        ans=ans+i;
    }
    return ans;
   
}

app.get("/", (req,res) => {
    
    //How we are going to get the paramter a after passing the query parameter
    const a = req.query.a;
    const ans=sum(a);
    res.send("Hii your ans is "+ans);
});

app.listen(3000);