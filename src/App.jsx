import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Landing page components
import Navbar from "./HomePages/Navbar";
import Home from "./HomePages/Home";
import Plan from "./HomePages/Plan";
import Features from "./HomePages/Features";
import Footer from "./HomePages/Footer";
import Login from "./HomePages/Login";

import Authorized from "./HomePages/Authorized";
import Dashboard from "./HomePages/userPages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
      <Route path="/authorized" element={<Authorized />} />
      <Route path="/dashboard"element={<ProtectedRoute><Dashboard /> </ProtectedRoute>}      />
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}





// import React from 'react';
// import './App.css'

// import Navbar from './HomePages/Navbar';
// import Home from './HomePages/Home';
// import Plan from './HomePages/Plan';
// import Features from './HomePages/Features';
// import Footer from './HomePages/Footer';

// function App() {
//   const showFooter = ["/"];
//   const showNavbar = ["/"];
//   return (
//     <>
//       <div>
//       {showNavbar.includes(location.pathname) && <Navbar />}
//         <Home/>
//         <Plan/>
//         <Features/>
//       {showFooter.includes(location.pathname) && <Footer />}
//       </div>
//     </>
//   )
// }

// export default App
