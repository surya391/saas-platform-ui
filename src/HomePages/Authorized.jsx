import React, { useEffect } from "react";
import { msalInstance } from "../msalInstance";
import { useNavigate } from "react-router-dom";

function Authorized() {
  console.log("Authorized called111");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccount = async () => {
      try {
        console.log("Initializing MSAL instance...");
        await msalInstance.initialize();

        console.log("Handling redirect promise...");
        const response = await msalInstance.handleRedirectPromise();

        if (response) {
          const idToken = response.idToken;
          console.log("idToken", idToken);
          const account = response.account;
          msalInstance.setActiveAccount(account);

          // Save to localStorage
          localStorage.setItem("id_token", idToken);
          localStorage.setItem("user", JSON.stringify(account));

          navigate("/dashboard");
        } else {
          console.warn("No redirect response found.");
        }
      } catch (error) {
        console.error("Redirect error:", error);
      }
    };

    checkAccount();
  }, [navigate]);

  return <div>Handling login...</div>;
}

export default Authorized;



// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

 
// export default function Authorized() {
//   console.log("Authorized called")
//   console.log("Authorized called2222")

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const code = params.get("code");
 
//     if (!code) {
//       setError("No code in URL.");
//       navigate("/", { replace: true });
//       return;
//     }
//   console.log("Authorized called 2222")
 
//     const fetchTokens = async () => {
//       try {
//   console.log("Authorized called 44444")
//   console.log("process.env.REACT_APP_CLIENT_ID",process.env.REACT_APP_CLIENT_ID)
//   console.log("process.env.REACT_APP_CLIENT_SECRET",process.env.REACT_APP_CLIENT_SECRET)
//   console.log("process.env.REACT_APP_REDIRECT_URI", process.env.REACT_APP_REDIRECT_URI)

//         const res = await fetch(
//           "https://saasssoapp.b2clogin.com/saasssoapp.onmicrosoft.com/b2c_1_signup_signin/oauth2/v2.0/token",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               grant_type: "authorization_code",
//               code: code,
//               client_id: process.env.REACT_APP_CLIENT_ID,
//               client_secret: process.env.REACT_APP_CLIENT_SECRET,
//               redirect_uri: process.env.REACT_APP_REDIRECT_URI,
//               // client_id: "8384b874-43b1-489d-9947-28d1fd958233",
//               // redirect_uri:
//               //   "https://happy-glacier-014cc2c00.6.azurestaticapps.net/authorized",
//               scope: "openid profile offline_access",
//             }),
//           }
//         );
 
//         const data = await res.json();
 
//         if (data.id_token) {
//           console.log("aaaaaaaa")
//           // Decode JWT to get user info
//           const user = jwtDecode(data.id_token);
 
//           // Save tokens in localStorage (or sessionStorage)
//           localStorage.setItem("id_token", data.id_token);
//           localStorage.setItem("access_token", data.access_token);
//           localStorage.setItem("refresh_token", data.refresh_token);
//           localStorage.setItem("user", JSON.stringify(user));
 
//           // Redirect to dashboard
//           navigate("/dashboard");
//         } else {
//           setError("Token exchange failed.");
//           console.error("Error:", data);
//         }
//       } catch (err) {
//         console.error("Token fetch error:", err);
//         setError("Network or token exchange error.");
//       }
//     };
 
//     fetchTokens();
//   }, [location, navigate]);
 
//   return <div>{error ? `Error: ${error}` : "Authorizing..."}</div>;
// }

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getAuthToken } from "../utils/auth";
// import { loginSuccess } from "../slices/authSlice";

// export default function Authorized() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   const token = getAuthToken();
//   //       console.log("token", token)
//   //   if (token) {
//   //     // dispatch(loginSuccess({})); 
//   //     navigate("/dashboard");
//   //   } else {
//   //     navigate("https://www.google.com");
//   //   }
//   // }, [navigate, dispatch]);

//     useEffect(() => {
//     const token = getAuthToken();
//         console.log("token", token)
//     if (token) {
//        navigate("/dashboard");
// } else {
//   navigate('http://google.com')
// }
//   }, [navigate]);
//   return <div>Authorizing...</div>;
// }



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

