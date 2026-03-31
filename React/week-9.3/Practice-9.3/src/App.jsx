// import { useEffect, useState } from "react";

// function App() {
//   const [currentTab, setCurrentTab] = useState(1);
//   const [tabData, setTabData] = useState({});
//   const [loading, setLoading]= useState(true);

//   useEffect(function () {
//     setLoading(true);
//     fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab)
//       .then(async (res) => {
//         const json = await res.json();
//         setTabData(json);
//         setLoading(false);
//       });
//   }, [currentTab]);

//   return (
//     <div>
//       <button
//         onClick={function () {
//           setCurrentTab(1);
//         }}
//         style={{ color: currentTab == 1 ? "red" : "black" }}
//       >
//         Todo #1
//       </button>

//       <button
//         onClick={function () {
//           setCurrentTab(2);
//         }}
//         style={{ color: currentTab == 2 ? "red" : "black" }}
//       >
//         Todo #2
//       </button>

//       <button
//         onClick={function () {
//           setCurrentTab(3);
//         }}
//         style={{ color: currentTab == 3 ? "red" : "black" }}
//       >
//         Todo #3
//       </button>

//       <button
//         onClick={function () {
//           setCurrentTab(4);
//         }}
//         style={{ color: currentTab == 4 ? "red" : "black" }}
//       >
//         Todo #4
//       </button>

//       <br />

//       {loading?"Loading...": tabData.title}
//     </div>
//   );
// }

// export default App;



//CLEANUP   ->>> Learning about the cleanup function

import { useEffect, useState } from "react";

function App() {

  const [showTimer, setShowTimer]= useState(true);

  useEffect(()=> {
    const Interval=setInterval(() => {
      setShowTimer(currentValue => !currentValue);
    }, 5000);
  },[]);
  return (
    <div>
      {showTimer&&<Timer />}
    </div>
  );
}

const Timer = function () {
  const [seconds, setSeconds] = useState(0);

  useEffect(function () {
    let clock = setInterval(function () {
      //Here till we had not used the "cleanup function" So, even when the component is not mounted still the clock is running 
      setSeconds((prev) => prev + 1);
    }, 1000);

    //CLEANUP FUNCTION  ->> Whenever the component is un-mounted then this cleanp function will be called
    return function() {
      //"clearInterval" is a funcntion that the JS provide us
      //Now when this function will be called then this will STOP the clock 
      clearInterval(clock)
    }
  }, []);

  return <div>{seconds} seconds elapsed</div>;
};

export default App;