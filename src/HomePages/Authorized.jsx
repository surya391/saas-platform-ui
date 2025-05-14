import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice"
export default function AuthChecker() {
  console.log("login", login)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const sessionToken = sessionStorage.getItem("id_token");
console.log('sessionToken', sessionToken)
console.log('cookieToken', cookieToken)

    if (cookieToken || sessionToken) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      window.location.href = "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net";
    }
  }, [navigate]);
  return null;
}


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AuthChecker() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check cookie
//     const cookieToken = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('token='))
//       ?.split('=')[1];

//     // Check sessionStorage
//     const sessionToken = sessionStorage.getItem("id_token");

//     if (cookieToken || sessionToken) {
//       dispatch(setAuthenticated(true)); 
//       navigate("/dashboard");
//     } else {
//       window.location.href = "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login";
//       console.log("No token found.");
//     }
//   }, [navigate]);

//   return null; 
// }





// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {login} from '../slices/authSlice'
// function Authorized() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const idToken = searchParams.get("token");

//     if (!idToken) {
//       console.error("No token found in URL");
//       navigate("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net");
//       return;
//     }

//     // Save token to sessionStorage and optionally cookie
//     sessionStorage.setItem("id_token", idToken);
//     document.cookie = `token=${idToken}; path=/;`;

//     // Verify token by calling backend
//     fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
//       method: "GET",
//       headers: {
//         Authorization: `${idToken}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Unauthorized access: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("API Response:", data);
//         dispatch(login()); 
//         navigate("/dashboard");
//       })
//       .catch((error) => {
//         console.error("Authorization failed:", error);
//         navigate("/error");
//       });
//   }, [location.search, navigate, dispatch]);

//   return <div>Processing login, please wait...</div>;
// }

// export default Authorized;





