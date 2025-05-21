import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import HomeImg from "../../HomePages/images/Home4.avif";

const PlansList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = '123';

  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.isLoading);
  const error = useSelector((state) => state.profile.error);

  // Local state to track limit if user upgrades
  const [currentLimit, setCurrentLimit] = useState(0);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  // When profile updates, set current limit to profile limit
  useEffect(() => {
    if (profile?.usage?.no_of_contacts?.limit) {
      setCurrentLimit(Number(profile.usage.no_of_contacts.limit));
    }
  }, [profile]);

  const used = Number(profile?.usage?.no_of_contacts?.used ?? 0);

  const isLimitReached = used >= currentLimit;

  const handleLogout = () => {
    alert('Logged out');
    navigate('/login');
  };

  // Simulate user increasing the limit from current to 10
  const increaseLimit = () => {
    if (currentLimit < 10) {
      setCurrentLimit(10);
    }
  };

  if (loading) {
    return <div className="text-white p-10 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-10 text-center">Error loading profile: {error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeImg})` }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-sm text-white">
        {/* Navbar */}
        <nav className="px-6 py-4 flex justify-between items-center border-b border-white/20">
          <h1 className="text-2xl font-bold tracking-wide">HireSense</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate(`/profile/${userId}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center text-center p-10 md:p-20 h-[80vh]">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
            Welcome to <span className="text-blue-400">HireSense</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
            The smartest way to discover talent. Get started with our intuitive hiring experience.
          </p>
          <button
            onClick={() =>
              window.open(
                'https://tickets-app-e6bze9hqfcduhndq.centralindia-01.azurewebsites.net',
                '_blank'
              )
            }
            disabled={isLimitReached}
            className={`${
              isLimitReached
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
            } text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300`}
          >
            {isLimitReached ? 'Limit Reached' : 'Experience HireSense'}
          </button>

          {/* Show usage info */}
          {profile && (
            <p className="mt-4 text-sm text-gray-300">
              Used contacts: {used} / {currentLimit}
            </p>
          )}

          {/* Button to increase limit (demo) */}
          {currentLimit < 10 && (
            <button
              onClick={increaseLimit}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              subscription Increase Limit to 10
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlansList;


////////////////////important
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../../slices/profileSlice';
// import { useNavigate } from 'react-router-dom';
// import HomeImg from "../../HomePages/images/Home4.avif";

// const PlansList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const profile = useSelector((state) => state.profile.data);
//   const loading = useSelector((state) => state.profile.isLoading);
//   const error = useSelector((state) => state.profile.error);

//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   // Extract limit and used contacts safely
//   const limit = Number(profile?.usage?.no_of_contacts?.limit ?? 0);
//   const used = Number(profile?.usage?.no_of_contacts?.used ?? 0);

//   // Disable button if used >= limit
//   const isLimitReached = used >= limit;

//   const handleLogout = () => {
//     alert('Logged out');
//     navigate('/login');
//   };

//   if (loading) {
//     return <div className="text-white p-10 text-center">Loading profile...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 p-10 text-center">Error loading profile: {error}</div>;
//   }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${HomeImg})` }}
//     >
//       <div className="min-h-screen bg-black/60 backdrop-blur-sm text-white">
//         {/* Navbar */}
//         <nav className="px-6 py-4 flex justify-between items-center border-b border-white/20">
//           <h1 className="text-2xl font-bold tracking-wide">HireSense</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => navigate(`/profile/${userId}`)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="flex flex-col justify-center items-center text-center p-10 md:p-20 h-[80vh]">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
//             Welcome to <span className="text-blue-400">HireSense</span>
//           </h2>
//           <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
//             The smartest way to discover talent. Get started with our intuitive hiring experience.
//           </p>
//           <button
//             onClick={() =>
//               window.open(
//                 'https://tickets-app-e6bze9hqfcduhndq.centralindia-01.azurewebsites.net',
//                 '_blank'
//               )
//             }
//             disabled={isLimitReached}
//             className={`${
//               isLimitReached
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
//             } text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300`}
//           >
//             {isLimitReached ? 'Limit Reached' : 'Experience HireSense'}
//           </button>

//           {/* Show usage info */}
//           {profile && (
//             <p className="mt-4 text-sm text-gray-300">
//               Used contacts: {used} / {limit}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlansList;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../../slices/profileSlice';
// import { useNavigate } from 'react-router-dom';
// import HomeImg from "../../HomePages/images/Home4.avif";

// const PlansList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const profile = useSelector((state) => state.profile.data);
//   const loading = useSelector((state) => state.profile.isLoading);
//   const error = useSelector((state) => state.profile.error);

//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   const limit = profile?.no_of_contacts?.limit ?? 0;
//   const used = profile?.no_of_contacts?.pending ?? 0; // Assuming 'pending' means used
//   const isLimitReached = used >= limit;

//   const handleLogout = () => {
//     alert('Logged out');
//     navigate('/login');
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${HomeImg})` }}
//     >
//       <div className="min-h-screen bg-black/60 backdrop-blur-sm text-white">
//         {/* Navbar */}
//         <nav className="px-6 py-4 flex justify-between items-center border-b border-white/20">
//           <h1 className="text-2xl font-bold tracking-wide">HireSense</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => navigate(`/profile/${userId}`)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="flex flex-col justify-center items-center text-center p-10 md:p-20 h-[80vh]">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
//             Welcome to <span className="text-blue-400">HireSense</span>
//           </h2>
//           <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
//             The smartest way to discover talent. Get started with our intuitive hiring experience.
//           </p>
//           <button
//             onClick={() =>
//               window.open(
//                 'https://tickets-app-e6bze9hqfcduhndq.centralindia-01.azurewebsites.net',
//                 '_blank'
//               )
//             }
//             disabled={isLimitReached}
//             className={`${
//               isLimitReached
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
//             } text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300`}
//           >
//             {isLimitReached ? 'Limit Reached' : 'Experience HireSense'}
//           </button>

//           {/* Optional: show contact usage info */}
//           {profile && (
//             <p className="mt-4 text-sm text-gray-300">
//               Used contacts: {used}/{limit}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlansList;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../../slices/profileSlice';
// import { useNavigate } from 'react-router-dom';
// import HomeImg from "../../HomePages/images/Home4.avif";

// const PlansList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const profile = useSelector((state) => state.profile.data);
//   const loading = useSelector((state) => state.profile.isLoading);
//   const error = useSelector((state) => state.profile.error);

//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   const limit = profile?.no_of_contacts?.limit ?? 0;
//   const pending = profile?.no_of_contacts?.pending ?? 0;
//   const used = limit - pending;

//   const isLimitReached = used >= limit;

//   const handleLogout = () => {
//     alert('Logged out');
//     navigate('/login');
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${HomeImg})` }}
//     >
//       <div className="min-h-screen bg-black/60 backdrop-blur-sm text-white">
//         {/* Navbar */}
//         <nav className="px-6 py-4 flex justify-between items-center border-b border-white/20">
//           <h1 className="text-2xl font-bold tracking-wide">HireSense</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => navigate(`/profile/${userId}`)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="flex flex-col justify-center items-center text-center p-10 md:p-20 h-[80vh]">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
//             Welcome to <span className="text-blue-400">HireSense</span>
//           </h2>
//           <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
//             The smartest way to discover talent. Get started with our intuitive hiring experience.
//           </p>
//           <button
//             onClick={() =>
//               window.open(
//                 'https://tickets-app-e6bze9hqfcduhndq.centralindia-01.azurewebsites.net',
//                 '_blank'
//               )
//             }
//             disabled={isLimitReached}
//             className={`${
//               isLimitReached
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
//             } text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300`}
//           >
//             {isLimitReached ? 'Limit Reached' : 'Experience HireSense'}
//           </button>

//           {/* Optional: show contact usage info */}
//           {/* {profile && (
//             <p className="mt-4 text-sm text-gray-300">
//               Used contacts: {used}/{limit}
//             </p>
//           )} */}
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlansList;

