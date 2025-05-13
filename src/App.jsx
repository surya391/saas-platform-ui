// src/App.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./HomePages/Navbar";
import Home from "./HomePages/Home";
import Plan from "./HomePages/Plan";
import Features from "./HomePages/Features";
import Footer from "./HomePages/Footer";
import Profile from "./HomePages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Authorized from "./HomePages/Authorized";
import Dashboard from "./HomePages/userPages/Dashboard";

function LandingPage() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <section id="home"><Home /></section>
      <section id="plans"><Plan /></section>
      <section id="features"><Features /></section>
      <section id="footer"><Footer /></section>
    </div>
  );
}
useEffect(()=>{
  const token = getCookie('token');
  console.log(token)
},[])
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Authorized />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
