import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Optional: if you have an authSlice to manage the token globally
// import { setToken } from "../slices/authSlice";

const Authorized = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (token) {
      sessionStorage.setItem("id_token", token);
      // Optional: dispatch to Redux store
      // dispatch(setToken(token));

      fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          console.log("User authorized:", data);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Authorization failed:", error);
          navigate("/login");
        });
    } else {
      console.warn("Token not found in URL");
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return <div className="text-center mt-10 text-gray-600 text-lg">Processing login...</div>;
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