// src/HomePages/Authorized.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

function Authorized() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const idToken = searchParams.get("token");
  
    if (!idToken) {
      console.error("No token found in URL");
      navigate("/login");
      return;
    }
  
    sessionStorage.setItem("id_token", idToken);
    dispatch(setToken(idToken));
  
    // Verify token by calling backend
    fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,  // Bearer token instead of passing directly
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unauthorized access: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
  
        // Redirect to dashboard
        navigate(`https://thankful-smoke-00bff5800.6.azurestaticapps.net/dashboard?token=${idToken}`);
      })
      .catch((error) => {
        console.error("Authorization failed:", error);
        navigate("/error"); // or /login if preferred
      });
  }, [location.search, navigate, dispatch]);
  

  return <div>Processing login, please wait...</div>;
}

export default Authorized;




// // src/HomePages/Authorized.js
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setToken } from "../slices/authSlice";

// function Authorized() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const idToken = searchParams.get("token");

//     if (!idToken) {
//       console.error("No token found in URL");
//       navigate("/login");
//       return;
//     }

//     // Store token
//     sessionStorage.setItem("id_token", idToken);
//     dispatch(setToken(idToken));

//     // Verify token by calling backend
//     fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
//       method: "GET",
//       headers: {
//         Authorization: idToken,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Unauthorized access");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("API Response:", data);
//         navigate("/dashboard");
//       })
//       .catch((error) => {
//         console.error("Authorization failed:", error);
//         navigate("/error"); // or /login if preferred
//       });
//   }, [location.search, navigate, dispatch]);

//   return <div>Processing login, please wait...</div>;
// }

// export default Authorized;



// // src/HomePages/Authorized.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setToken } from "../slices/authSlice";

// function Authorized() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const idToken = searchParams.get("token");

//     if (idToken) {
//       sessionStorage.setItem("id_token", idToken);
//       dispatch(setToken(idToken));

//       fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
//         method: "GET",
//         headers: {
//           Authorization: `${idToken}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("API Response:", data);
//           navigate("/dashboard");
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//           navigate("/error");
//         });
//     } else {
//       console.error("No token found in URL");
//       navigate("/login");
//     }
//   }, [navigate, dispatch]);

//   return <div>Processing login...</div>;
// }

// export default Authorized;