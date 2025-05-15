// App.js
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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    <Route path="/authorized" element={<Authorized />} />

    </Routes>
  );
}
