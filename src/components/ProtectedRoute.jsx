

// src/components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;



// import { Navigate } from "react-router-dom";
// import React from 'react'
// function ProtectedRoute({ children }) {
//   const token = sessionStorage.getItem("id_token"); // or use another method to check for authentication
//   if (!token) {
//     // Redirect them to the login page if not authenticated
//     return <Navigate to="/login" />;
//   }
//   return children; // Allow access to the protected route
// }

// export default ProtectedRoute;


