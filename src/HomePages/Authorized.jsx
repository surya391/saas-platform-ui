import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../utils/auth";
import { loginSuccess } from "../slices/authSlice";
 
export default function Authorized() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
 
    if (code) {
      fetch("https://saasssoapp.b2clogin.com/saasssoapp.onmicrosoft.com/b2c_1_signup_signin/oauth2/v2.0/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          client_id: "8384b874-43b1-489d-9947-28d1fd958233", 
          redirect_uri: "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", 
          scope: "openid profile offline_access"
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.id_token) {
          localStorage.setItem("auth_token", data.id_token);
          dispatch(loginSuccess({}));
          navigate("/dashboard");
        } else {
          navigate("/", { replace: true });
        }
      });
    } else {
      navigate("/", { replace: true });
    }
  }, [location, navigate, dispatch]);
 
  return <div>Authorizing...</div>;
}
 


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

