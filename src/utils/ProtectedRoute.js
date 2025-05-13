import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("id_token");
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
