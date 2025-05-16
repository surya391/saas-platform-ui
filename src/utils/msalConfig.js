// msalConfig.js
export const msalConfig = {
  auth: {
    clientId: "8384b874-43b1-489d-9947-28d1fd958233",
    authority: "https://saasssoapp.b2clogin.com/saasssoapp.onmicrosoft.com/B2C_1_signup_signin",
    redirectUri: "https://happy-glacier-014cc2c00.6.azurestaticapps.net/authorized", // must match Azure B2C
  },
  cache: {
    cacheLocation: "localStorage", // or sessionStorage
    storeAuthStateInCookie: false,
  },
};
