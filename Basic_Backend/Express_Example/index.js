const express= require("express");
const app = express();

app.use(express.json()); //If we will not write this line then req.body will show undefined. req.query will run without this.

const users=[{
    name:"Abhijeet",
    Kidneys: [{
        healthy:false,
    }]
}];

app.get("/", function(req, res) {
    //Q-1. Write a logic to return how many kidneys the paitent have and whether they are healthy or not
    const patientKidneys=users[0].Kidneys;
    const numberOfKidneys=patientKidneys.length;

    //use Filter in Js logic here so learn about this as well
    let numberOfHealthyKidneys=0;
    for(let i=0;i<patientKidneys.length;i++) {
        if(patientKidneys[i].healthy) numberOfHealthyKidneys++;
    }
    const numberOfUnhealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

//Q2. User can Add new kidney use POST method

//If any one of the kidney are healthy then no sergery
// app.post("/", function(req,res) {
//     for(let i=0;i<users[0].Kidneys.length;i++) {
//         if(users[0].Kidneys[i].healthy) {
//             return res.json({
//                 msg:"You already have a healthy kidney"
//             })
//         }
//     }
//     const isHealthy= req.body.isHealthy;
//     users[0].Kidneys.push({
//         healthy:isHealthy
//     })
//     res.json({
//         msg:"Done!"
//     })
// })


//Chatgpt answer 
//If any one kidney are unhealthy then surgery will be done

// app.post("/", function(req, res) {

//   let allHealthy = true;

//   for (let i = 0; i < users[0].Kidneys.length; i++) {
//     if (users[0].Kidneys[i].healthy === false) {
//       allHealthy = false;
//       break;
//     }
//   }

//   if (allHealthy) {
//     return res.json({
//       msg: "All kidneys are healthy no surgery needed"
//     });
//   }

//   // else surgery done
//   const isHealthy = req.body.isHealthy;
//   users[0].Kidneys.push({
//     healthy: isHealthy
//   });

//   res.json({
//     msg: "Surgery done new kidney added"
//   });
// });
  




//First check while adding if the user had 2 kidney or not after that if it has 2 kidneys and atleast one of them is not working properly the send message
//You already had 2 kidneys but this much number of kidney if deffectted so delete those kidney first else if both are healthy tell your both kidneys are working well
app.post("/", function (req, res) {
  const kidneys = users[0].Kidneys;
  const numberOfKidneys = kidneys.length;

  // count unhealthy kidneys
  let numberOfUnhealthyKidneys = 0;
  for (let i = 0; i < kidneys.length; i++) {
    if (kidneys[i].healthy === false) {
      numberOfUnhealthyKidneys++;
    }
  }

  // If already 2 kidneys
  if (numberOfKidneys === 2) {
    if (numberOfUnhealthyKidneys > 0) {
      return res.json({
        msg: `You already have 2 kidneys but ${numberOfUnhealthyKidneys} are defective ❌ Delete unhealthy kidneys first`
      });
    } else {
      return res.json({
        msg: "Both kidneys are working well no surgery needed"
      });
    }
  }

  // If less than 2 kidneys, allow adding
  const isHealthy = req.body.isHealthy;

  users[0].Kidneys.push({
    healthy: isHealthy
  });

  res.json({
    msg: "Kidney added successfully"
  });
});


//Q3. User can replace a kidney, make it healthy  Use PUT method
app.put("/", function(req, res) {
    for(let i=0;i<users[0].Kidneys.length;i++) {
        users[0].Kidneys[i].healthy=true; 
    }
    //Although we do not have any data to send, still we need to send something else the request will keep loading. Postman doesn't come to know the the request is done
    //So we are writing the below code line
    res.json({});

})

//User can remove all unHealthy kidneys use DELETE method
app.delete("/", function(req, res) {
    //You should return 411
    //This should run only if there is one unhealthy kidney, else return 411

    if(isThereAtLeastOneUnhealthyKidney()) {
        const newKidneys=[];
        for(let i=0;i<users[0].Kidneys.length;i++) {
            if(users[0].Kidneys[i].healthy) {
                newKidneys.push({
                    healthy:true
                })
            }
        }
        users[0].Kidneys=newKidneys;
        res.json({msg:"All the unhealthy kidneys are removed successfully"})
    }
    else {
        res.sendStatus(411).json({
            msg:"You hane no unhealthy kidneys."
        });
    }
})

function isThereAtLeastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney=false;
    for(let i=0;i<users[0].Kidneys.length;i++) {
        if(!users[0].Kidneys[i].healthy) {
           atleastOneUnhealthyKidney=true;
           break;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);