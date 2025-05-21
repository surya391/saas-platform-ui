
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans, subscribeToPlan, checkUsabilityStatus } from '../../slices/plansSlice';
import { fetchUserProfile } from '../../slices/profileSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = '123';
  // const dispatch = useDispatch();
  // const userId = '123';
  const [activeTab, setActiveTab] = useState('plans');

  const {
    items: plans,
    status: plansStatus,
    isLoading: subscriptionLoading,
    success: subscriptionSuccess,
    subscriptionError,
  } = useSelector((state) => state.plans);

  const profile = useSelector((state) => state.profile.data);
  const profileLoading = useSelector((state) => state.profile.isLoading);
  const profileError = useSelector((state) => state.profile.error);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (activeTab === 'plans' && plansStatus === 'idle') {
      dispatch(getPlans());
    }
  }, [activeTab, dispatch, plansStatus]);

  useEffect(() => {
    if (subscriptionSuccess) {
      dispatch(fetchUserProfile(userId));
    }
  }, [subscriptionSuccess, dispatch, userId]);

  useEffect(() => {
    if (subscriptionSuccess) {
      navigate('/plancard');
    }
  }, [subscriptionSuccess, navigate]);

  useEffect(() => {
    const checkSubscriptionUsability = async () => {
      if (profile && profile.subscription_id) {
        try {
          const status = await checkUsabilityStatus(userId, profile.subscription_id);
          if (status?.status === 'active') {
            navigate('/plancard');
          }
        } catch (error) {
          console.error('Error checking usability status:', error);
        }
      }
    };
    checkSubscriptionUsability();
  }, [profile, navigate, userId]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSubscribe = (planId) => {
    dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
  };

  // Extract usage info and determine if limit is reached
  const contactsLimit = Number(profile?.usage?.no_of_contacts?.limit ?? 0);
  const contactsPending = Number(profile?.usage?.no_of_contacts?.pending ?? 0);
  const isLimitReached = contactsPending >= contactsLimit;

  // For debugging (optional)
  // console.log('contactsLimit:', contactsLimit);
  // console.log('contactsPending:', contactsPending);
  // console.log('isLimitReached:', isLimitReached);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
        <div className="flex gap-5">
          <button
            onClick={() => navigate(`/dashboardprofile/${userId}`)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
          >
            Plans
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-10 max-w-7xl mx-auto">
        {profileLoading ? (
          <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
        ) : profileError ? (
          <p className="text-center text-red-600 text-lg font-semibold mt-20">
            Error loading profile: {profileError}
          </p>
        ) : (
          <>
            {profile?.subscription_id ? (
              <div className="text-center mt-24">
                <h2 className="text-4xl font-bold text-gray-900 mb-5">Welcome Back!</h2>
                <p className="text-xl text-gray-700 mb-4">Your subscription is active.</p>

                {/* Usage */}
                <div className="bg-white p-6 rounded-xl shadow-md inline-block mb-6">
                  <p className="text-lg font-semibold text-gray-800 mb-2">📊 Current Usage:</p>
                  <p className="text-gray-700 text-md">
                    📇 No of contacts: {contactsPending}/{contactsLimit}
                  </p>
                </div>

                {/* Experience Button with disable logic */}
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/experience-app')}
                    disabled={isLimitReached}
                    className={`py-4 px-8 rounded-xl text-xl font-semibold transition duration-300 shadow-lg ${
                      isLimitReached
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    Experience App
                  </button>
                  {isLimitReached && (
                    <p className="mt-2 text-red-600 font-semibold">
                      You have reached your contacts usage limit. Please upgrade your plan or reduce usage.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              activeTab === 'plans' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                    Choose a Plan to Get Started
                  </h2>

                  {subscriptionLoading && (
                    <p className="text-center text-blue-600 font-medium mb-6">
                      Processing your subscription...
                    </p>
                  )}

                  {subscriptionError && (
                    <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
                  )}

                  {subscriptionSuccess && (
                    <p className="text-center text-green-600 font-semibold mb-6">
                      Subscription successful!
                    </p>
                  )}

                  {plansStatus === 'loading' ? (
                    <p className="text-center text-gray-600 font-medium">Loading plans...</p>
                  ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {plans.map((plan) => {
                        const planId = plan._id || plan.id;
                        const isSubscribed = profile?.subscription_id === planId;

                        return (
                          <div
                            key={planId}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                          >
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
                            <p className="text-gray-700 text-lg mb-2">
                              <strong>Price:</strong> ₹{plan.price}
                            </p>
                            <p className="text-gray-700 text-lg mb-6">
                              <strong>No. of Contacts:</strong> {plan.no_of_contacts}
                            </p>
                            <button
                              onClick={() => handleSubscribe(planId)}
                              disabled={subscriptionLoading || isSubscribed}
                              className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
                                subscriptionLoading || isSubscribed
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
                              }`}
                            >
                              {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}
          </>
        )}
      </main>
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);

//   // Fetch profile initially
//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   // Navigate to /plancard if user already subscribed
//   useEffect(() => {
//     if (profile && profile.subscription_id) {
//       navigate('/plancard');
//     }
//   }, [profile, navigate]);

//   // Fetch plans when tab is "plans"
//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   // Re-fetch profile after subscription success
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => navigate(`/dashboardprofile/${userId}`)}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('plans')}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Plans
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="p-10 max-w-7xl mx-auto">
//         {profileLoading ? (
//           <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
//         ) : profileError ? (
//           <p className="text-center text-red-600 text-lg font-semibold mt-20">
//             Error loading profile: {profileError}
//           </p>
//         ) : (
//           <>
//             {activeTab === 'plans' && (
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
//                   Choose a Plan to Get Started
//                 </h2>

//                 {subscriptionLoading && (
//                   <p className="text-center text-blue-600 font-medium mb-6">
//                     Processing your subscription...
//                   </p>
//                 )}

//                 {subscriptionError && (
//                   <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
//                 )}

//                 {subscriptionSuccess && (
//                   <p className="text-center text-green-600 font-semibold mb-6">
//                     Subscription successful!
//                   </p>
//                 )}

//                 {plansStatus === 'loading' ? (
//                   <p className="text-center text-gray-600 font-medium">Loading plans...</p>
//                 ) : (
//                   <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                     {plans.map((plan) => {
//                       const planId = plan._id || plan.id;
//                       const isSubscribed = profile?.subscription_id === planId;

//                       return (
//                         <div
//                           key={planId}
//                           className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
//                         >
//                           <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
//                           <p className="text-gray-700 text-lg mb-2">
//                             <strong>Price:</strong> ₹{plan.price}
//                           </p>
//                           <p className="text-gray-700 text-lg mb-6">
//                             <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                           </p>
//                           <button
//                             onClick={() => handleSubscribe(planId)}
//                             disabled={subscriptionLoading || isSubscribed}
//                             className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
//                               subscriptionLoading || isSubscribed
//                                 ? 'bg-gray-400 cursor-not-allowed'
//                                 : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
//                             }`}
//                           >
//                             {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);

//   // Fetch profile initially
//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   // Redirect to /plancard if user is already subscribed
//   useEffect(() => {
//     if (profile && profile.subscription_id) {
//       navigate('/plancard');
//     }
//   }, [profile, navigate]);

//   // Fetch plans when tab is "plans"
//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   // Re-fetch profile after successful subscription
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   // Navigate to /plancard after successful subscription
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       navigate('/plancard');
//     }
//   }, [subscriptionSuccess, navigate]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//   };
// console.log('profile.subscription_id:', profile?.subscription_id);
// // console.log('planId:', planId);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => navigate(`/dashboardprofile/${userId}`)}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('plans')}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Plans
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="p-10 max-w-7xl mx-auto">
//         {profileLoading ? (
//           <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
//         ) : profileError ? (
//           <p className="text-center text-red-600 text-lg font-semibold mt-20">
//             Error loading profile: {profileError}
//           </p>
//         ) : (
//           <>
//             {activeTab === 'plans' && (
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
//                   Choose a Plan to Get Started
//                 </h2>

//                 {subscriptionLoading && (
//                   <p className="text-center text-blue-600 font-medium mb-6">
//                     Processing your subscription...
//                   </p>
//                 )}

//                 {subscriptionError && (
//                   <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
//                 )}

//                 {subscriptionSuccess && (
//                   <p className="text-center text-green-600 font-semibold mb-6">
//                     Subscription successful!
//                   </p>
//                 )}

//                 {plansStatus === 'loading' ? (
//                   <p className="text-center text-gray-600 font-medium">Loading plans...</p>
//                 ) : (
//                   <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                     {plans.map((plan) => {
//                       const planId = plan._id || plan.id;
//                       const isSubscribed = profile?.subscription_id === planId;

//                       return (
//                         <div
//                           key={planId}
//                           className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
//                         >
//                           <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
//                           <p className="text-gray-700 text-lg mb-2">
//                             <strong>Price:</strong> ₹{plan.price}
//                           </p>
//                           <p className="text-gray-700 text-lg mb-6">
//                             <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                           </p>
//                           <button
//                             onClick={() => handleSubscribe(planId)}
//                             disabled={subscriptionLoading || isSubscribed}
//                             className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
//                               subscriptionLoading || isSubscribed
//                                 ? 'bg-gray-400 cursor-not-allowed'
//                                 : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
//                             }`}
//                           >
//                             {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan, checkUsabilityStatus } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';

// const PlanCard = ({ plan, isSubscribed, onSubscribe, loading }) => {
//   const planId = plan._id || plan.id;

//   return (
//     <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
//       <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
//       <p className="text-gray-700 text-lg mb-2">
//         <strong>Price:</strong> ₹{plan.price}
//       </p>
//       <p className="text-gray-700 text-lg mb-6">
//         <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//       </p>
//       <button
//         onClick={onSubscribe}
//         disabled={loading || isSubscribed}
//         className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
//           loading || isSubscribed
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
//         }`}
//       >
//         {loading && !isSubscribed ? 'Processing...' : isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//       </button>
//     </div>
//   );
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';
//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);
//   const { subscription_id } = profile || {};

//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   useEffect(() => {
//     if (subscriptionSuccess) {
//       navigate('/plancard');
//     }
//   }, [subscriptionSuccess, navigate]);

//   useEffect(() => {
//     const checkSubscriptionUsability = async () => {
//       if (subscription_id) {
//         try {
//           const status = await dispatch(checkUsabilityStatus({ userId, subscriptionId: subscription_id })).unwrap();
//           if (status?.status === 'active') {
//             navigate('/plancard');
//           }
//         } catch (error) {
//           console.error('Error checking usability status:', error);
//         }
//       }
//     };

//     checkSubscriptionUsability();
//   }, [dispatch, navigate, userId, subscription_id]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => navigate(`/dashboardprofile/${userId}`)}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('plans')}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Plans
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="p-10 max-w-7xl mx-auto">
//         {profileLoading ? (
//           <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
//         ) : profileError ? (
//           <p className="text-center text-red-600 text-lg font-semibold mt-20">
//             Error loading profile: {profileError}
//           </p>
//         ) : (
//           <>
//             {subscription_id ? (
//               <div className="text-center mt-24">
//                 <h2 className="text-4xl font-bold text-gray-900 mb-5">Welcome Back!</h2>
//                 <p className="text-xl text-gray-700 mb-8">Your subscription is active.</p>
//                 <button
//                   onClick={() => navigate('/experience-app')}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-8 rounded-xl text-xl font-semibold transition duration-300 shadow-lg"
//                 >
//                   Experience App
//                 </button>
//               </div>
//             ) : (
//               activeTab === 'plans' && (
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
//                     Choose a Plan to Get Started
//                   </h2>

//                   {subscriptionLoading && (
//                     <p className="text-center text-blue-600 font-medium mb-6">
//                       Processing your subscription...
//                     </p>
//                   )}

//                   {subscriptionError && (
//                     <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
//                   )}

//                   {subscriptionSuccess && (
//                     <p className="text-center text-green-600 font-semibold mb-6">
//                       Subscription successful!
//                     </p>
//                   )}

//                   {plansStatus === 'loading' ? (
//                     <p className="text-center text-gray-600 font-medium">Loading plans...</p>
//                   ) : (
//                     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                       {plans.map((plan) => (
//                         <PlanCard
//                           key={plan._id}
//                           plan={plan}
//                           isSubscribed={subscription_id === plan._id}
//                           onSubscribe={() => handleSubscribe(plan._id)}
//                           loading={subscriptionLoading}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

////////////////important
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan, checkUsabilityStatus } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';
//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);

//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   useEffect(() => {
//     if (subscriptionSuccess) {
//       navigate('/plancard');
//     }
//   }, [subscriptionSuccess, navigate]);

//   useEffect(() => {
//     const checkSubscriptionUsability = async () => {
//       if (profile && profile.subscription_id) {
//         try {
//           const status = await checkUsabilityStatus(userId, profile.subscription_id);
//           if (status?.status === 'active') {
//             navigate('/plancard');
//           }
//         } catch (error) {
//           console.error('Error checking usability status:', error);
//         }
//       }
//     };
//     checkSubscriptionUsability();
//   }, [profile, navigate, userId]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//   };

//   const contactsLimit = profile?.usage?.no_of_contacts?.limit ?? 0;
//   const contactsPending = profile?.usage?.no_of_contacts?.pending ?? 0;
//   const isLimitReached = contactsPending >= contactsLimit;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => navigate(`/dashboardprofile/${userId}`)}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('plans')}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Plans
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="p-10 max-w-7xl mx-auto">
//         {profileLoading ? (
//           <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
//         ) : profileError ? (
//           <p className="text-center text-red-600 text-lg font-semibold mt-20">
//             Error loading profile: {profileError}
//           </p>
//         ) : (
//           <>
//             {profile?.subscription_id ? (
//               <div className="text-center mt-24">
//                 <h2 className="text-4xl font-bold text-gray-900 mb-5">Welcome Back!</h2>
//                 <p className="text-xl text-gray-700 mb-4">Your subscription is active.</p>

//                 {/* ✅ Usage */}
//                 <div className="bg-white p-6 rounded-xl shadow-md inline-block mb-6">
//                   <p className="text-lg font-semibold text-gray-800 mb-2">📊 Current Usage:</p>
//                   <p className="text-gray-700 text-md">
//                     📇 No of contacts: {contactsPending}/{contactsLimit}
//                   </p>
//                 </div>

//                 {/* ✅ Experience Button */}
//                 <button
//                   onClick={() => navigate('/experience-app')}
//                   disabled={isLimitReached}
//                   className={`py-4 px-8 rounded-xl text-xl font-semibold transition duration-300 shadow-lg ${
//                     isLimitReached
//                       ? 'bg-gray-400 text-white cursor-not-allowed'
//                       : 'bg-indigo-600 hover:bg-indigo-700 text-white'
//                   }`}
//                 >
//                   Experience App
//                 </button>
//               </div>
//             ) : (
//               activeTab === 'plans' && (
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
//                     Choose a Plan to Get Started
//                   </h2>

//                   {subscriptionLoading && (
//                     <p className="text-center text-blue-600 font-medium mb-6">
//                       Processing your subscription...
//                     </p>
//                   )}

//                   {subscriptionError && (
//                     <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
//                   )}

//                   {subscriptionSuccess && (
//                     <p className="text-center text-green-600 font-semibold mb-6">
//                       Subscription successful!
//                     </p>
//                   )}

//                   {plansStatus === 'loading' ? (
//                     <p className="text-center text-gray-600 font-medium">Loading plans...</p>
//                   ) : (
//                     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                       {plans.map((plan) => {
//                         const planId = plan._id || plan.id;
//                         const isSubscribed = profile?.subscription_id === planId;

//                         return (
//                           <div
//                             key={planId}
//                             className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
//                           >
//                             <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
//                             <p className="text-gray-700 text-lg mb-2">
//                               <strong>Price:</strong> ₹{plan.price}
//                             </p>
//                             <p className="text-gray-700 text-lg mb-6">
//                               <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                             </p>
//                             <button
//                               onClick={() => handleSubscribe(planId)}
//                               disabled={subscriptionLoading || isSubscribed}
//                               className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
//                                 subscriptionLoading || isSubscribed
//                                   ? 'bg-gray-400 cursor-not-allowed'
//                                   : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
//                               }`}
//                             >
//                               {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                             </button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';
// import { checkUsabilityStatus } from '../../slices/plansSlice';
// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';
//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);

//   // Fetch profile initially
//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   // Fetch plans when tab is "plans"
//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   // Re-fetch profile after successful subscription
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   // Navigate to /plancard only when subscription is successful
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       navigate('/plancard');
//     }
//   }, [subscriptionSuccess, navigate]);

//   // 🆕 Check subscription usability after profile is loaded
//   useEffect(() => {
//     const checkSubscriptionUsability = async () => {
//       if (profile && profile.subscription_id) {
//         try {
//           const status = await checkUsabilityStatus(userId, profile.subscription_id);
//           if (status?.status === 'active') { 
//             navigate('/plancard');
//           }
//         } catch (error) {
//           console.error('Error checking usability status:', error);
//         }
//       }
//     };

//     checkSubscriptionUsability();
//   }, [profile, navigate, userId]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => navigate(`/dashboardprofile/${userId}`)}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('plans')}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Plans
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="p-10 max-w-7xl mx-auto">
//         {profileLoading ? (
//           <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
//         ) : profileError ? (
//           <p className="text-center text-red-600 text-lg font-semibold mt-20">
//             Error loading profile: {profileError}
//           </p>
//         ) : (
//           <>
//             {profile?.subscription_id ? (
//               <div className="text-center mt-24">
//                 <h2 className="text-4xl font-bold text-gray-900 mb-5">Welcome Back!</h2>
//                 <p className="text-xl text-gray-700 mb-8">Your subscription is active.</p>
//                 <button
//                   onClick={() => navigate('/experience-app')}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-8 rounded-xl text-xl font-semibold transition duration-300 shadow-lg"
//                 >
//                   Experience App
//                 </button>
//               </div>
//             ) : (
//               activeTab === 'plans' && (
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
//                     Choose a Plan to Get Started
//                   </h2>

//                   {subscriptionLoading && (
//                     <p className="text-center text-blue-600 font-medium mb-6">
//                       Processing your subscription...
//                     </p>
//                   )}

//                   {subscriptionError && (
//                     <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
//                   )}

//                   {subscriptionSuccess && (
//                     <p className="text-center text-green-600 font-semibold mb-6">
//                       Subscription successful!
//                     </p>
//                   )}

//                   {plansStatus === 'loading' ? (
//                     <p className="text-center text-gray-600 font-medium">Loading plans...</p>
//                   ) : (
//                     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                       {plans.map((plan) => {
//                         const planId = plan._id || plan.id;
//                         const isSubscribed = profile?.subscription_id === planId;

//                         return (
//                           <div
//                             key={planId}
//                             className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
//                           >
//                             <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
//                             <p className="text-gray-700 text-lg mb-2">
//                               <strong>Price:</strong> ₹{plan.price}
//                             </p>
//                             <p className="text-gray-700 text-lg mb-6">
//                               <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                             </p>
//                             <button
//                               onClick={() => handleSubscribe(planId)}
//                               disabled={subscriptionLoading || isSubscribed}
//                               className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
//                                 subscriptionLoading || isSubscribed
//                                   ? 'bg-gray-400 cursor-not-allowed'
//                                   : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
//                               }`}
//                             >
//                               {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                             </button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


////////////////important

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);

//   // Fetch profile initially
//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   // Fetch plans when tab is "plans"
//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   // Re-fetch profile after successful subscription
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   // Navigate to /plancard only when subscription is successful
//   useEffect(() => {
//     if (subscriptionSuccess) {
//       navigate('/plancard');
//     }
//   }, [subscriptionSuccess, navigate]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//     // Navigation handled in useEffect based on subscriptionSuccess
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
//       <nav className="bg-white shadow-lg px-10 py-5 flex items-center justify-between">
//         <h1 className="text-3xl font-extrabold text-blue-800 tracking-wide">My Dashboard</h1>
//         <div className="flex gap-5">
//           <button
//             onClick={() => navigate(`/dashboardprofile/${userId}`)}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('plans')}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Plans
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="p-10 max-w-7xl mx-auto">
//         {profileLoading ? (
//           <p className="text-center text-gray-500 text-lg font-medium mt-20">Loading profile...</p>
//         ) : profileError ? (
//           <p className="text-center text-red-600 text-lg font-semibold mt-20">
//             Error loading profile: {profileError}
//           </p>
//         ) : (
//           <>
//             {profile?.subscription_id ? (
//               <div className="text-center mt-24">
//                 <h2 className="text-4xl font-bold text-gray-900 mb-5">Welcome Back!</h2>
//                 <p className="text-xl text-gray-700 mb-8">Your subscription is active.</p>
//                 <button
//                   onClick={() => navigate('/experience-app')}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-8 rounded-xl text-xl font-semibold transition duration-300 shadow-lg"
//                 >
//                   Experience App
//                 </button>
//               </div>
//             ) : (
//               activeTab === 'plans' && (
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
//                     Choose a Plan to Get Started
//                   </h2>

//                   {subscriptionLoading && (
//                     <p className="text-center text-blue-600 font-medium mb-6">
//                       Processing your subscription...
//                     </p>
//                   )}

//                   {subscriptionError && (
//                     <p className="text-center text-red-600 font-semibold mb-6">Error: {subscriptionError}</p>
//                   )}

//                   {subscriptionSuccess && (
//                     <p className="text-center text-green-600 font-semibold mb-6">
//                       Subscription successful!
//                     </p>
//                   )}

//                   {plansStatus === 'loading' ? (
//                     <p className="text-center text-gray-600 font-medium">Loading plans...</p>
//                   ) : (
//                     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                       {plans.map((plan) => {
//                         const planId = plan._id || plan.id;
//                         const isSubscribed = profile?.subscription_id === planId;

//                         return (
//                           <div
//                             key={planId}
//                             className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
//                           >
//                             <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{plan.plan_name}</h3>
//                             <p className="text-gray-700 text-lg mb-2">
//                               <strong>Price:</strong> ₹{plan.price}
//                             </p>
//                             <p className="text-gray-700 text-lg mb-6">
//                               <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                             </p>
//                             <button
//                               onClick={() => handleSubscribe(planId)}
//                               disabled={subscriptionLoading || isSubscribed}
//                               className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
//                                 subscriptionLoading || isSubscribed
//                                   ? 'bg-gray-400 cursor-not-allowed'
//                                   : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
//                               }`}
//                             >
//                               {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                             </button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlans, subscribeToPlan } from '../../slices/plansSlice';
// import { fetchUserProfile } from '../../slices/profileSlice';
// import HomeImg from "../../HomePages/images/Home4.avif"

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userId = '123';

//   const [activeTab, setActiveTab] = useState('plans');

//   const {
//     items: plans,
//     status: plansStatus,
//     isLoading: subscriptionLoading,
//     success: subscriptionSuccess,
//     subscriptionError,
//   } = useSelector((state) => state.plans);

//   const profile = useSelector((state) => state.profile.data);
//   const profileLoading = useSelector((state) => state.profile.isLoading);
//   const profileError = useSelector((state) => state.profile.error);

//   useEffect(() => {
//     dispatch(fetchUserProfile(userId));
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (activeTab === 'plans' && plansStatus === 'idle') {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch, plansStatus]);

//   useEffect(() => {
//     if (subscriptionSuccess) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [subscriptionSuccess, dispatch, userId]);

//   useEffect(() => {
//     if (subscriptionSuccess) {
//       navigate('/plancard');
//     }
//   }, [subscriptionSuccess, navigate]);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   const handleSubscribe = (planId) => {
//     dispatch(subscribeToPlan({ userId, subscriptionId: planId }));
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${HomeImg})` }}
//     >
//       <div className="min-h-screen bg-white/70 backdrop-blur-sm">
//         <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-blue-700">My Dashboard</h1>
//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate(`/profile/${userId}`)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md"
//             >
//               Profile
//             </button>
//             <button
//               onClick={() => setActiveTab('plans')}
//               className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md"
//             >
//               Plans
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md"
//             >
//               Logout
//             </button>
//           </div>
//         </nav>

//         <main className="p-8">
//           {profileLoading ? (
//             <p className="text-center text-gray-600">Loading profile...</p>
//           ) : profileError ? (
//             <p className="text-center text-red-600">Error loading profile: {profileError}</p>
//           ) : (
//             <>
//               {profile?.subscription_id ? (
//                 <div className="text-center mt-16">
//                   <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome Back!</h2>
//                   <p className="text-lg text-gray-600 mb-6">Your subscription is active.</p>
//                   <button
//                     onClick={() => navigate('/experience-app')}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md text-lg transition duration-300"
//                   >
//                     Experience App
//                   </button>
//                 </div>
//               ) : (
//                 activeTab === 'plans' && (
//                   <div>
//                     <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//                       Choose a Plan to Get Started
//                     </h2>

//                     {subscriptionLoading && (
//                       <p className="text-center text-blue-600 mb-4">
//                         Processing your subscription...
//                       </p>
//                     )}

//                     {subscriptionError && (
//                       <p className="text-center text-red-600 mb-4">Error: {subscriptionError}</p>
//                     )}

//                     {subscriptionSuccess && (
//                       <p className="text-center text-green-600 mb-4">
//                         Subscription successful!
//                       </p>
//                     )}

//                     {plansStatus === 'loading' ? (
//                       <p className="text-center text-gray-600">Loading plans...</p>
//                     ) : (
//                       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                         {plans.map((plan) => {
//                           const planId = plan._id || plan.id;
//                           const isSubscribed = profile?.subscription_id === planId;

//                           return (
//                             <div key={planId} className="bg-white shadow p-6 rounded-lg">
//                               <h3 className="text-xl font-bold text-gray-800 mb-2">
//                                 {plan.plan_name}
//                               </h3>
//                               <p className="text-gray-600 mb-1">
//                                 <strong>Price:</strong> ₹{plan.price}
//                               </p>
//                               <p className="text-gray-600 mb-4">
//                                 <strong>No. of Contacts:</strong> {plan.no_of_contacts}
//                               </p>
//                               <button
//                                 onClick={() => handleSubscribe(planId)}
//                                 disabled={subscriptionLoading || isSubscribed}
//                                 className={`py-2 px-4 rounded-md transition duration-300 text-white ${
//                                   subscriptionLoading || isSubscribed
//                                     ? 'bg-gray-400 cursor-not-allowed'
//                                     : 'bg-purple-600 hover:bg-purple-700'
//                                 }`}
//                               >
//                                 {isSubscribed ? 'Already Subscribed' : 'Subscribe'}
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 )
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
