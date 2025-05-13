import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: '8384b874-43b1-489d-9947-28d1fd958233', // Replace with your Client ID
    authority: 'https://saasssoapp.b2clogin.com/saasssoapp.onmicrosoft.com/B2C_1_signup_signin', // Your B2C policy
    redirectUri: 'https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized', // Your redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage', // Store session data in sessionStorage
    storeAuthStateInCookie: false,   // Optional, to store authentication state in cookies
  }
};

// Initialize the MSAL Public Client Application
export const msalInstance = new PublicClientApplication(msalConfig);

// Function to handle the redirect after login
export const handleRedirect = async () => {
  try {
    const response = await msalInstance.handleRedirectPromise();
    if (response) {
      // Store necessary data in sessionStorage
      const { account, accessToken, idToken } = response;
      sessionStorage.setItem('user', JSON.stringify(account));  // Store user info
      sessionStorage.setItem('accessToken', accessToken);       // Store access token
      sessionStorage.setItem('idToken', idToken);               // Store ID token (optional)

      console.log("Login successful, session data saved:", account);
    }
  } catch (error) {
    console.error("Error handling login redirect:", error);
  }
};

// Call handleRedirect when the app initializes to handle any redirect result.
handleRedirect();
