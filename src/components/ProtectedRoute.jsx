// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = getAuthToken();
console.log(token)
  if (!token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;



// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { login } from "../slices/authSlice"

// export default function ProtectedRoute({ children }) {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop().split(";").shift();
//       return null;
//     };

//     const sessionToken = sessionStorage.getItem("id_token");
//     const cookieToken = getCookie("token");

//     if (sessionToken || cookieToken) {
//       dispatch(login()); // set isAuthenticated to true
//     }
//   }, [dispatch]);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }
