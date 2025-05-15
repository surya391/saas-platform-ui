import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../utils/auth";
import { loginSuccess } from "../slices/authSlice";

export default function Authorized() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = getAuthToken();
  //       console.log("token", token)
  //   if (token) {
  //     // dispatch(loginSuccess({})); 
  //     navigate("/dashboard");
  //   } else {
  //     navigate("https://www.google.com");
  //   }
  // }, [navigate, dispatch]);
  
  useEffect(() => {
  const token = getAuthToken();
  console.log("token", token);

  if (token) {
    navigate("/dashboard");
  } else {
    window.location.href = "https://www.google.com"; 
  }
}, [navigate]);


  return <div>Authorizing...</div>;
}




// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getAuthToken } from "../utils/auth";
// import { loginSuccess } from "../slices/authSlice";

// export default function Authorized() {

//   console.log("loginSuccess",loginSuccess)

//   console.log('getAuthTOken', getAuthToken)

  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = getAuthToken();

//     if (token) {
//       // const userData = JSON.parse(sessionStorage.getItem("user")) || { name: "User", email: "demo@example.com" };
//       // dispatch(loginSuccess());
//       navigate("/dashboard");
//     } else {
//       navigate(`www.google.com`);
//     }
//   }, [navigate]);

//   return <div>Authorizing...</div>;
// }



// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AuthChecker() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop().split(";").shift();
//       return null;
//     };

//     const cookieToken = getCookie("token");
//     const sessionToken = sessionStorage.getItem("id_token");

//     if (!cookieToken && !sessionToken) {
//       // Redirect to login page if no token is found
//       navigate("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login")
//     } else {
//       // Redirect to dashboard if authenticated
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   return null;
// }




// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AuthChecker() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check cookie
//     // const cookieToken = document.cookie
//     //   .split('; ')
//     //   .find(row => row.startsWith('token='))
//     //   ?.split('=')[1];

//     // // Check sessionStorage
//     // const sessionToken = sessionStorage.getItem("id_token");
//     const getCookie = (name) => {
//        const value = `; ${document.cookie}`; 
//        const parts = value.split(`; ${name}=`); 
//        if (parts.length === 2) return parts.pop().split(";").shift(); 
//        return null; };
//        const cookieToken = getCookie("token");
//         const sessionToken = sessionStorage.getItem("id_token");
//     if (!sessionToken && !cookieToken) {
//       console.log("No token f ound, redirecting to login...");
//       navigate("/dashboard") 
//     }
//   }, [navigate]);
//   // if (cookieToken || sessionToken) {
//   //   dispatch(setAuthenticated(true)); 
//   //   navigate("/dashboard");
//   // } else {
//   //   window.location.href = "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login";
//   //   console.log("No token found.");
//   // }
//   // }, [navigate]);

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





