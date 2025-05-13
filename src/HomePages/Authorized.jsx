import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      sessionStorage.setItem("id_token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default Authorized;





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