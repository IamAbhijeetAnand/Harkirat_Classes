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

// import { useState, useEffect } from 'react';
// function App() {
//   //let counterVisible=true;
//   let [counterVisible, setCounterVisible] = useState(true);

//   useEffect(function () {
//     setInterval(function () {
//       setCounterVisible(c => !c);  //Flipping the value on every 5 seconds
//     }, 5000);
//   }, [])
//   return <div>
//     <b>
//       Hii there!!!
//       We are using setInterval to convert this counter into Timer like thing
//     </b>

//     {counterVisible && <Counter></Counter>}

//   </div>
//   //if conterVisible is true then only show the Counter component, and this is called "CONDITIONAL RENDERING" 
// }

// //Mounting, re-rendering, un-mounting
// function Counter() {

//   const [count, setCount] = useState(0);

//   function increaseCounter() {
//     setCount(count + 1);
//   }


//   console.log("counter");

//   //You can't simply use srtInterval, you have to Hooking into the lifecycle events of react 
//   //Without useEffect it will re-render a lot of times
//   useEffect(function () {
//     console.log("On Mount");
//     //Don't run this on every render, run this on first render only and that first render is called the a "LIFE CYCLE EVENT"(mounting,re-rendering, unmounting)
//     //For that we use useEffect hook

//     //We wanted to guard our setInterval from re-renders, we had done this by using useEffect hook
//     let clock=setInterval(function () {
//       console.log("from Inside setInterval");
//       //setCount(count=>count + 1);      //Now after using useEffect, no matter how many re-render happens this setInterval code will run only once

//       setCount(function (cnt) {
//         return cnt + 1;
//       })
//     }, 1000);

//     return () => {
//       console.log("On Unmount")
//       clearInterval(clock);   // ✅ cleanup fixes everything
//     };
//   }, []); //useEffect hook takes two arguments (a function, and a dependency array)

//   return <div>

//     <h1 id="text">{count}</h1>
//     <button onClick={increaseCounter}>Increment</button>
//   </div>
// }
// export default App



//RE-LEARNNG CLEANUP,useEffect, Learning about the dependency array
//week9.2 after 1:20:10 video timeline

import { use } from 'react';
import {useState, useEffect} from 'react';

//useEffect, dependency array, unmounting
function App() {

  const [count, setCount]= useState(0);

  function increase() {
    setCount(c=>c+1);
  }

  //And we pass this above count down here as a "prop"
  return <div>
    <Counter count={count}/>
    <button onClick={increase}>Increase Count</button>
  </div>
}

//mounting ,re-rendering, un-mounting  ->> These are life cycle events
function Counter(props) {
  //What i want to say that, i am rendering a Counter component and the Counter is going to receive some props
  //We can name this argument as any random name but the common practice is to write it as "props"
  //And you are going to render "props.count"


  //We put the count variable in App function and pass it as a "props" to the counter component what we are rendering at the last as "props.count"


  //This one will run only once as there is an "empty" DEPENDENCY ARRAY.
  useEffect(function() {
    console.log("mounted render");

    return function() {
      console.log("Unmounted render");
    }
  }, []);

//This one will run when the count will be changed (As we had send "props.count" in DEPENDENCY ARRAY)
  useEffect(function() {
    console.log("Count has changed");
  },[props.count])


  return <div>
    Counter {props.count}
    
  </div>
}

export default App

//NOTE: Whenever a state variable changes you might want to run some logic  ->> That is where this "DEPENDENCY ARRRAY" comes to the picture

//NOTE: useEffect is not only for life cycle events, it is more generic whenever you want to run some logic, whenever a bunch of state vaiable changes then you use useEffect
       // A conciqence of that is if you pass an empty Dependecy array then that logic will run atleast once
      // If we change any other variable then the "props.count" useEffect will not run
