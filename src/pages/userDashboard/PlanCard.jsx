import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const limit = profile?.no_of_contacts?.limit ?? 0;
  const pending = profile?.no_of_contacts?.pending ?? 0;
  const used = limit - pending;

  const isLimitReached = used >= limit;

  const handleLogout = () => {
    alert('Logged out');
    navigate('/login');
  };

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

          {/* Optional: show contact usage info */}
          {/* {profile && (
            <p className="mt-4 text-sm text-gray-300">
              Used contacts: {used}/{limit}
            </p>
          )} */}
          
        </div>
      </div>
    </div>
  );
};

export default PlansList;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import HomeImg from "../../HomePages/images/Home4.avif"

// const PlansList = () => {
//   const navigate = useNavigate();
//   const userId = '123'; 

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
//             className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
//           >
//             Experience HireSense
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlansList;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getPlans } from '../../slices/plansSlice';

// const PlansList = () => {
//     const navigate = useNavigate();
//     const userId = '123'; // Replace with dynamic logic or useSelector

//     const handleLogout = () => {
//         alert('Logged out');
//         navigate('/login');
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
//                 <div className="text-lg font-semibold">HireSence</div>
//                 <div className="space-x-4">
//                     <button
//                         onClick={() => navigate(`/profile/${userId}`)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md"
//                     >
//                         Profile
//                     </button>
                 

//                     <button
//                         onClick={handleLogout}
//                         className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             {/* Main content */}
//             <div className="p-6">
                
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//    <button
//                         onClick={() => window.open('https://tickets-app-e6bze9hqfcduhndq.centralindia-01.azurewebsites.net', '_blank')}
//                         className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
//                     >
//                         Experience HireSense
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlansList;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getPlans, subscribeToPlan } from '../../slices/plansSlice';

// const PlansList = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Local state for active tab
//   const [activeTab, setActiveTab] = useState('plans');

//   // Get data from Redux store with safe optional chaining
//   const profile = useSelector(state => state.user?.profile);
//   const plans = useSelector(state => state.plans?.items || []); // adjust if your state differs
//   const plansStatus = useSelector(state => state.plans?.status);
//   const subscriptionLoading = useSelector(state => state.plans?.subscriptionLoading);
//   const subscriptionError = useSelector(state => state.plans?.subscriptionError);
//   const subscriptionSuccess = useSelector(state => state.plans?.subscriptionSuccess);

//   const userId = profile?.id || '123'; // fallback if profile.id missing

//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   const handleLogout = () => {
//     alert('Logged out');
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     // dispatch your subscribe action here
//     dispatch(subscribeToPlan(planId));
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
//         <div className="text-lg font-semibold">HireSence</div>
//         <div className="space-x-4">
//           <button
//             onClick={() => navigate(`/profile/${userId}`)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() =>
//               window.open(
//                 'https://tickets-app-e6bze9hqfcduhndq.centralindia-01.azurewebsites.net',
//                 '_blank'
//               )
//             }
//             className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
//           >
//             Experience HireSense
//           </button>

//           <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main content */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
//         {profile?.subscription_id ? (
//           <div className="text-center mt-16">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome Back!</h2>
//             <p className="text-lg text-gray-600 mb-6">Your subscription is active.</p>
//             <button
//               onClick={() => navigate('/experience-app')}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md text-lg transition duration-300"
//             >
//               Experience App
//             </button>
//           </div>
//         ) : (
//           activeTab === 'plans' && (
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//                 Choose a Plan to Get Started
//               </h2>

//               {subscriptionLoading && (
//                 <p className="text-center text-blue-600 mb-4">Processing your subscription...</p>
//               )}

//               {subscriptionError && (
//                 <p className="text-center text-red-600 mb-4">Error: {subscriptionError}</p>
//               )}

//               {subscriptionSuccess && (
//                 <p className="text-center text-green-600 mb-4">Subscription successful!</p>
//               )}

//               {plansStatus === 'loading' ? (
//                 <p className="text-center text-gray-600">Loading plans...</p>
//               ) : (
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                   {plans.map((plan) => {
//                     const planId = plan._id || plan.id;
//                     const isSubscribed = profile?.subscription_id === planId;

//                     return (
//                       <div key={planId} className="bg-white shadow p-6 rounded-lg">
//                         <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.plan_name}</h3>
//                         <p className="text-gray-600 mb-1">
//                           <strong>Price:</strong> ₹{plan.price}
//                         </p>
//                         <p className="text-gray-600 mb-4">
//                           <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                         </p>
//                         <button
//                           onClick={() => handleSubscribe(planId)}
//                           disabled={subscriptionLoading || isSubscribed}
//                           className={`py-2 px-4 rounded-md transition duration-300 text-white ${
//                             subscriptionLoading || isSubscribed
//                               ? 'bg-gray-400 cursor-not-allowed'
//                               : 'bg-purple-600 hover:bg-purple-700'
//                           }`}
//                         >
//                           {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlansList;


