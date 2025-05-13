import React from "react";
import { Navigate } from "react-router-dom";

// Helper to get cookie value
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("id_token")?.trim() || getCookie("id_token");

  console.log("Token in ProtectedRoute:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
