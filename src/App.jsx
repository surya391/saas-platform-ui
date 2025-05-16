// App.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./slices/authSlice";
import { getAuthToken } from "./utils/auth";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = getAuthToken();

    if (user && token) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);

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
