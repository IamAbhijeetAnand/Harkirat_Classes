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

// import './App.css'
// import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

// function App() {
//   return (
//     <div>
//       <BrowserRouter>

//         <Routes>
//           {/* Layout Wrapper */}
//           <Route path="/" element={<Layout />}>

//             {/* Home Page */}
//             <Route index element={<Landing />} />

//             {/* Other Pages */}
//             <Route path="neet/online-coaching-class-11" element={<Class11Program />} />
//             <Route path="neet/online-coaching-class-12" element={<Class12Program />} />

//             {/* Error Page */}
//             <Route path="*" element={<ErrorPage />} />

//           </Route>
//         </Routes>

//       </BrowserRouter>
//     </div>
//   );
// }

// function Layout() {
//   return (
//     <div style={{ height: "100vh" }}>

//       {/* Navbar */}
//       <div>
//         <Link to="/">Allen</Link> |{" "}
//         <Link to="/neet/online-coaching-class-11">Class 11</Link> |{" "}
//         <Link to="/neet/online-coaching-class-12">Class 12</Link>
//       </div>

//       {/* Main Content */}
//       <div style={{ height: "90vh" }}>
//         <Outlet />
//       </div>

//       {/* Footer */}
//       <div>
//         Footer | Contact us
//       </div>

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

// function ErrorPage() {
//   return (
//     <div>
//       404 - Page Not Found
//     </div>
//   );
// }

// export default App;

//UPDATED CODE


import './App.css'

// Import required components from react-router-dom
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      {/* BrowserRouter provides routing context to entire app */}
      <BrowserRouter>

        {/* Routes is a container for all Route definitions */}
        <Routes>

          {/* Parent Route (Layout wrapper for all pages) */}
          <Route path="/" element={<Layout />}>

            {/* Index route = default page for "/" */}
            <Route index element={<Landing />} />

            {/* Child routes (render inside <Outlet /> of Layout) */}
            <Route path="neet/online-coaching-class-11" element={<Class11Program />} />
            <Route path="neet/online-coaching-class-12" element={<Class12Program />} />

            {/* Wildcard route for handling invalid URLs */}
            <Route path="*" element={<ErrorPage />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    // Main layout container
    <div style={{ height: "100vh", background: "green" }}>
      
      {/* Common Header/Navbar */}
      <Header />

      {/* Main content area (dynamic content loads here) */}
      <div style={{ height: "90vh", background: "red" }}>
        {/* Outlet renders matched child route */}
        <Outlet />
      </div>

      {/* Footer (common for all pages) */}
      <footer>
        Footer | Contact us
      </footer>

    </div>
  );
}

function Header() {
  return (
    <div>
      {/* Link is used instead of <a> to avoid page reload */}
      <Link to="/">Allen</Link> |{" "}

      {/* Navigation links */}
      <Link to="/neet/online-coaching-class-11">Class 11</Link> |{" "}
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
    </div>
  );
}

// Landing (Home Page)
function Landing() {
  return <div>Welcome to allen</div>;
}

// Class 11 Page
function Class11Program() {
  return <div>NEET Class 11 Program</div>;
}

// Class 12 Page
function Class12Program() {
  return <div>NEET Class 12 Program</div>;
}

// Error Page (for unknown routes)
function ErrorPage() {
  return <div>404 - Page Not Found</div>;
}

export default App;