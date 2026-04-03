// import './App.css'
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// function App() {

//   return (
//     <div>
//       <BrowserRouter>
//         {/* Common Top bar for all pages */}
//         {/*<a href="/">Allen</a> | <a href="/neet/online-coaching-class-11">Class 11</a> | <a href="/neet/online-coaching-class-12">Class 12</a>*/}
//         {/* Insted of anchor "a" tag we have to use the Link as "a" tag fetch or reload while navigating */}
//         {/*We cannot use Link outside the BrowserRouter because
//           <Link> depends on Router context 
//           When you use: <Link to="/about">About</Link>
//           React Router internally needs:Current URL, Navigation function, History management
//           All of this is provided by: <BrowserRouter>
//        */}

//         <Link to="/">Home</Link> |
//         <Link to="/neet/online-coaching-class-11">Class 11</Link> |
//         <Link to="/neet/online-coaching-class-12">Class 12</Link>
//         <Routes>
//           <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />
//           <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />
//           <Route path="/" element={<Landing />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// function Landing() {
//   return (
//     <div>
//       Welcome to allen
//     </div>
//   );
// }

// function Class11Program() {
//   return (
//     <div>
//       NEET Class 11 Program
//     </div>
//   );
// }

// function Class12Program() {
//   return (
//     <div>
//       NEET Class 12 Program
//     </div>
//   );
// }

// export default App


//LAYOUT CODE AND EXAMPLES BELOW

import './App.css'
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          {/* Layout Wrapper */}
          <Route path="/" element={<Layout />}>

            {/* Home Page */}
            <Route index element={<Landing />} />

            {/* Other Pages */}
            <Route path="neet/online-coaching-class-11" element={<Class11Program />} />
            <Route path="neet/online-coaching-class-12" element={<Class12Program />} />

            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />

          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ height: "100vh" }}>

      {/* Navbar */}
      <div>
        <Link to="/">Allen</Link> |{" "}
        <Link to="/neet/online-coaching-class-11">Class 11</Link> |{" "}
        <Link to="/neet/online-coaching-class-12">Class 12</Link>
      </div>

      {/* Main Content */}
      <div style={{ height: "90vh" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <div>
        Footer | Contact us
      </div>

    </div>
  );
}

function Landing() {
  return (
    <div>
      Welcome to allen
    </div>
  );
}

function Class11Program() {
  return (
    <div>
      NEET Class 11 Program
    </div>
  );
}

function Class12Program() {
  return (
    <div>
      NEET Class 12 Program
    </div>
  );
}

function ErrorPage() {
  return (
    <div>
      404 - Page Not Found
    </div>
  );
}

export default App;