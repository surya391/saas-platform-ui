export const msalConfig = {
  auth: {
    //clientId: "f0085a3c-668e-4f9d-9088-774a173bc7d9",
    //authority: "https://cazelabssaas.b2clogin.com/cazelabssaas.onmicrosoft.com/B2C_1_signin",
    //knownAuthorities: ["cazelabssaas.b2clogin.com"],
    clientId: "70aed927-4c46-4c0c-a169-4f77761846c6",
    authority: "https://cazelabssaas.b2clogin.com/cazelabssaas.onmicrosoft.com/B2C_1_signin",
    knownAuthorities: ["cazelabssaas.b2clogin.com"],    
    redirectUri: "http://localhost:5173/dashboard",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "offline_access"],
};
// export const logoutRequest = {
//   postLogoutRedirectUri: "/", // or your desired redirect URI after logout
// };

export const apiRequest = {
  scopes: ["https://cazelabssaas.onmicrosoft.com/api/read"],  // Your API scope here
  //scopes: ["https://yourtenant.onmicrosoft.com/api/read"],  // Your API scope here
};
