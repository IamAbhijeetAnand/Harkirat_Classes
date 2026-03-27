// import {useState} from 'react';
// function App() {
//   return <div>
//     <b>
//       Hii there!!!
//     </b>
//     <Counter></Counter>
//   </div>
// }

// function Counter() {

//   const [count, setCount]=useState(0);

//   function increaseCounter() {
//     setCount(count+1);
//   }
//   function decreaseCounter() {
//     setCount(count-1);
//   }
//   function resetCounter() {
//     setCount(0);
//   }
//   return <div>
//     <h1 id="text">{count}</h1>
//     <button onClick={resetCounter}>Reset Counter</button>
//     <button onClick={increaseCounter}>Increment</button>
//     <button onClick={decreaseCounter}>Decrement</button>
//   </div>
// }
// export default App

//Now After creating the counter, i want counter will increase by 1 on each second
//We will use setInterval for that

import { useState, useEffect } from 'react';
function App() {
  //let counterVisible=true;
  let [counterVisible, setCounterVisible]= useState(true);

   useEffect(function() {
    setInterval(function() {
      setCounterVisible(c=>!c);  //Flipping the value on every 5 seconds
    },5000);
  },[])
  return <div>
    <b>
      Hii there!!!
      We are using setInterval to convert this counter into Timer like thing
    </b>

    {counterVisible && <Counter></Counter>}  
    
  </div>
  //if conterVisible is true then only show the Counter component, and this is called "CONDITIONAL RENDERING" 
}

//Mounting, re-rendering, un-mounting
function Counter() {

  const [count, setCount] = useState(0);

  function increaseCounter() {
    setCount(count + 1);
  }


  console.log("counter");

  //You can't simply use srtInterval, you have to Hooking into the lifecycle events of react 
  //Without useEffect it will re-render a lot of times
  useEffect(function () {
    //Don't run this on every render, run this on first render only and that first render is called the a "LIFE CYCLE EVENT"(mounting,re-rendering, unmounting)
    //For that we use useEffect hook

    //We wanted to guard our setInterval from re-renders, we had done this by using useEffect hook
    setInterval(function () {
      //setCount(count=>count + 1);      //Now after using useEffect, no matter how many re-render happens this setInterval code will run only once

      setCount(function(cnt){
        return cnt+1;
      })
    }, 1000);

  //   return () => {
  //   clearInterval(id);   // ✅ cleanup fixes everything
  // }; 
  }, []); //useEffect hook takes two arguments (a function, and a dependency array)

  return <div>

    <h1 id="text">{count}</h1>
    <button onClick={increaseCounter}>Increment</button>
  </div>
}
export default App