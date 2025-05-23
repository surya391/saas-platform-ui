import React from "react";
import { Routes, Route } from "react-router-dom";

// Landing page components
import Navbar from "./HomePages/Navbar";
import Home from "./HomePages/Home";
import Plan from "./HomePages/Plan";
import Features from "./HomePages/Features";
import Footer from "./HomePages/Footer";
import Authorized from "./HomePages/Authorized";

// Pages
import PlansList from "./pages/userDashboard/PlanCard";
import Dashboard from "./pages/userDashboard/Dashboard";

import Login from "./pages/ProfilePages/Login";

import DashboardProfile from "./pages/ProfilePages/DashboardProfile";
import Profile from "./pages/ProfilePages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";


function LandingPage() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <section id="home">
        <Home />
      </section>
      <section id="plans">
        <Plan />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        }
      />
      <Route path="/plancard" element={<PlansList />} />
      <Route path="/authorized" element={<Authorized />} />
      <Route path="/profile/:user_id" element={<Profile />} />
      <Route path="/dashboardprofile/:user_id" element={<DashboardProfile />} />
    </Routes>
  );
}


// // App.js
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Landing page components
// import Navbar from "./HomePages/Navbar";
// import Home from "./HomePages/Home";
// import Plan from "./HomePages/Plan";
// import Features from "./HomePages/Features";
// import Footer from "./HomePages/Footer";
// import Authorized from "./HomePages/Authorized"; 
// import PlansList from "./pages/userDashboard/PlanCard";

// // Pages
// import Dashboard from "./pages/userDashboard/Dashboard";
// // import PlanCard from "./pages/userDashboard/PlanCard";

// import Login from "./pages/ProfilePages/Login";
// import DashboardProfile from "./pages/ProfilePages/DashboardProfile";
// import Profile from "./pages/ProfilePages/Profile"
// // import ProtectedRoute from "./components/ProtectedRoute";

// function LandingPage() {
//   return (
//     <div className="scroll-smooth">
//       <Navbar />
//       <section id="home">
//         <Home />
//       </section>
//       <section id="plans">
//         <Plan />
//       </section>
//       <section id="features">
//         <Features />
//       </section>
//       <section id="footer">
//         <Footer />
//       </section>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//     <Route path="/login" element={<Login />} />

//       <Route path="/dashboard"  element={
//           // <ProtectedRoute>
//             <Dashboard />
//           // </ProtectedRoute>
//         }
//       />
//     <Route path="/plancard" element={<PlansList />} />


//     <Route path="/authorized" element={<Authorized />} />
//     <Route path="/profile/:user_id" element={<Profile />} />
//     <Route path="/dashboardprofile/:user_id" element={<DashboardProfile />} />

//     </Routes>
//   );
// }
