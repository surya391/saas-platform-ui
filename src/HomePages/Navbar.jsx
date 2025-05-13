// import React, { useState, useEffect } from 'react';
// import { msalInstance } from '../utils/authConfig';
// import { useDispatch } from 'react-redux';
// import { setUserInfo, setLoginStatus } from '../slices/authSlice'; // Redux slice for user info

// export default function Navbar() {
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const dispatch = useDispatch(); // Use dispatch for Redux actions

//   // Handle Azure login
//   const handleAzureLogin = async () => {
//     setIsLoggingIn(true);
//     try {
//       // Initiate login redirect and await the result
//       await msalInstance.loginRedirect({
//         scopes: ['openid', 'profile', 'email'], // Modify based on your required scopes
//       });
//     } catch (error) {
//       console.error("Azure login error:", error);
//       setIsLoggingIn(false);
//     }
//   };

//   // Handle MSAL redirect response in useEffect
//   useEffect(() => {
//     const handleLoginRedirect = async () => {
//       try {
//         const response = await msalInstance.handleRedirectPromise();
//         if (response) {
//           // Login successful, store session data and update Redux store
//           const { account, accessToken, idToken } = response;

//           sessionStorage.setItem('user', JSON.stringify(account));  // Save user data
//           sessionStorage.setItem('accessToken', accessToken);       // Save access token
//           sessionStorage.setItem('idToken', idToken);               // Save ID token

//           // Dispatch user info to Redux store
//           dispatch(setUserInfo(account));
//           dispatch(setLoginStatus(true));

//           console.log("Login successful, session data saved:", account);
//         }
//       } catch (error) {
//         console.error("Error handling login redirect:", error);
//       }
//     };

//     handleLoginRedirect();
//   }, [dispatch]);

//   return (
//     <nav>
//       <button onClick={handleAzureLogin} disabled={isLoggingIn}>
//         {isLoggingIn ? 'Logging in...' : 'Login'}
//       </button>
//     </nav>
//   );
// }







import React, { useState } from 'react';
import FooterImg from './images/Footer.jpg';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="relative flex items-center justify-between px-6 py-4 bg-blue-50 shadow-md"
      style={{
        backgroundImage: `url(${FooterImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <a href="#home" className="flex items-center space-x-3">
        <img src={FooterImg} alt="Hire Sense Logo" className="h-10 w-10 rounded-full shadow-md" />
        <span className="text-2xl font-bold text-white">Hire Sense</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex space-x-40">
        <a href="#features" className="text-white text-xl hover:text-blue-400">Features</a>
        <a href="#plans" className="text-white text-xl hover:text-blue-400">Plans</a>
        <a href="#home" className="text-white text-xl hover:text-blue-400">Home</a>
        <a
          href="https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login"
          className="block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Login
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setIsMenuOpen(o => !o)}
      >
        {isMenuOpen ? '×' : '≡'}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-purple-600 p-6 space-y-4 z-50 shadow-lg md:hidden">
          <button className="self-end text-2xl text-blue-900 bg-white rounded-full w-8 h-8"
            onClick={() => setIsMenuOpen(false)}>×</button>
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-white text-xl">Features</a>
          <a href="#plans" onClick={() => setIsMenuOpen(false)} className="block text-white text-xl">Plans</a>
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-white text-xl">Home</a>
          <a
            href="https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login"
            className="block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
}



//////Important

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import FooterImg from './images/Footer.jpg';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav
//       className="relative flex flex-wrap justify-between items-center px-6 py-4 bg-blue-50 shadow-md"
//       style={{
//         backgroundImage: `url(${FooterImg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       {/* Left: Logo */}
//       <div className="flex items-center space-x-3">
//         <img src={FooterImg} alt="Hire Sense Logo" className="h-10 w-10 rounded-full shadow-md" />
//         <span className="text-2xl font-bold text-white hover:text-blue-200 transition duration-300">
//           Hire Sense
//         </span>
//       </div>

//       {/* Hamburger Icon (only on mobile) */}
//       <div className="md:hidden">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-white text-3xl focus:outline-none"
//         >
//           {isMenuOpen ? '×' : '≡'}
//         </button>
//       </div>

//       {/* Desktop Nav */}
//       <div className="hidden md:flex md:flex-row md:space-x-20 md:items-center">
//         <Link to="/features">
//           <button className="text-white text-xl font-semibold cursor-pointer tracking-wide hover:text-blue-400 transition duration-300 transform hover:scale-105">
//             Features
//           </button>
//         </Link>
//         <Link to="/plans">
//           <button className="text-white text-xl font-semibold cursor-pointer tracking-wide hover:text-blue-400 transition duration-300 transform hover:scale-105">
//             Plans
//           </button>
//         </Link>
//         <Link to="/login">
//           <button className="text-white text-xl font-semibold cursor-pointer tracking-wide hover:text-blue-400 transition duration-300 transform hover:scale-105">
//             Login
//           </button>
//         </Link>
//         <Link to="/signup">
//           <button className="bg-blue-600 text-white text-xl px-5 py-2 cursor-pointer rounded-md hover:bg-blue-700 transition font-medium transform hover:scale-105">
//             Sign Up
//           </button>
//         </Link>
//       </div>

//       {/* Mobile Drawer */}
//       {isMenuOpen && (
//         <div className="fixed top-0 right-0 h-full w-64 bg-purple-600 text-black flex flex-col items-start p-6 space-y-4 z-50 shadow-lg transition-all duration-300 md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(false)}
//             className="ml-auto mb-4 flex items-center justify-center w-8 h-8 text-2xl font-bold text-blue-900 bg-white  shadow-lg hover:bg-blue-100 transition-all duration-300"
//           >
//             ×
//           </button>

//           <Link to="/features">
//             <button className="text-white text-xl font-semibold cursor-pointer tracking-wide hover:text-blue-700 transition duration-300 transform hover:scale-105">
//               Features
//             </button>
//           </Link>
//           <Link to="/plans">
//             <button className="text-white text-xl font-semibold cursor-pointer tracking-wide hover:text-blue-700 transition duration-300 transform hover:scale-105">
//               Plans
//             </button>
//           </Link>
//           <Link to="/login">
//             <button className="text-white text-xl font-semibold cursor-pointer tracking-wide hover:text-blue-700 transition duration-300 transform hover:scale-105">
//               Login
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition">
//               Sign Up
//             </button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }





























