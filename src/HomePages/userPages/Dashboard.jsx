import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../slices/plansSlice";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("plans");
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: plans, status, error } = useSelector((state) => state.plans);

  const handleLogout = () => {
    sessionStorage.removeItem("id_token");
    window.location.href =
      "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login";
  };

  useEffect(() => {
    const token = sessionStorage.getItem("id_token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (activeTab === "profile") {
      fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user profile");
          return res.json();
        })
        .then((data) => setUserProfile(data))
        .catch((err) => {
          console.error(err);
          setUserProfile(null);
        });
    } else if (activeTab === "plans") {
      dispatch(getPlans());
    }
  }, [activeTab, dispatch, navigate]);

  const transformedPlans = Array.isArray(plans)
    ? plans.map((plan) => ({
        plan_name: plan.plan_name,
        price: plan.price,
        no_of_contacts: plan.no_of_contacts,
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">Hire Sense</h1>
          <div className="space-x-4">
            <button
              onClick={() => setActiveTab("plans")}
              className={`px-5 py-2 rounded-md font-semibold transition ${
                activeTab === "plans"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              Plans
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-2 rounded-md font-semibold transition ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10 px-6 max-w-6xl mx-auto w-full">
        {activeTab === "plans" && (
          <section className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Plans</h2>
            {status === "loading" && <p className="text-gray-500">Loading plans...</p>}
            {status === "failed" && <p className="text-red-500">{error}</p>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-6">
              {transformedPlans.map((plan, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 bg-gray-50 shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {plan.plan_name}
                  </h3>
                  <p className="text-gray-500 mt-2">₹{plan.price}</p>
                  <p className="text-gray-500 mb-4">
                    No. of Contacts: {plan.no_of_contacts}
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "profile" && (
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile</h2>
            {userProfile ? (
              Object.entries(userProfile).map(([key, value]) => (
                <div key={key} className="flex gap-2 mb-2">
                  <span className="font-medium text-gray-600 capitalize">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="text-gray-800">
                    {Array.isArray(value)
                      ? value.join(", ")
                      : typeof value === "object" && value !== null
                      ? JSON.stringify(value)
                      : value?.toString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading profile...</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}








// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlans } from "../../slices/plansSlice";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("plans");
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { items: plans, status, error } = useSelector((state) => state.plans);

//   // const handleLogout = () => {
//   //   sessionStorage.removeItem("id_token");
//   //   navigate("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login");
//   // };
//   const handleLogout = () => {
//     sessionStorage.removeItem("id_token");
//     window.location.href = "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login";
//   };
  

//   useEffect(() => {
//     if (activeTab === "profile") {
//       const token = sessionStorage.getItem("id_token");
//       if (token) {
//         fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
//           method: "GET",
//           headers: {
//             Authorization: token,
//           },
//         })
//           .then((res) => {
//             if (!res.ok) throw new Error("Failed to fetch user profile");
//             return res.json();
//           })
//           .then((data) => setUserProfile(data))
//           .catch((err) => {
//             console.error(err);
//             setUserProfile(null);
//           });
//       }
//     } else if (activeTab === "plans") {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch]);

//   const transformedPlans =
//     plans && plans.plans && Array.isArray(plans.plans)
//       ? plans.plans.map((planName, index) => ({
//           plan_name: planName,
//           price: plans.price?.[index] || 0,
//           duration_in_days: plans.Days?.[index] || 0,
//         }))
//       : [];

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Navbar */}
//       <header className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-blue-700">Hire Sense</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => setActiveTab("plans")}
//               className={`px-5 py-2 rounded-md font-semibold transition ${
//                 activeTab === "plans"
//                   ? "bg-blue-600 text-white"
//                   : "bg-blue-100 text-blue-800 hover:bg-blue-200"
//               }`}
//             >
//               Plans
//             </button>
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`px-5 py-2 rounded-md font-semibold transition ${
//                 activeTab === "profile"
//                   ? "bg-blue-600 text-white"
//                   : "bg-blue-100 text-blue-800 hover:bg-blue-200"
//               }`}
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-5 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 py-10 px-6 max-w-6xl mx-auto w-full">
//         {activeTab === "plans" && (
//           <section className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Plans</h2>
//             {status === "loading" && <p className="text-gray-500">Loading plans...</p>}
//             {status === "failed" && <p className="text-red-500">{error}</p>}
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-6">
//               {transformedPlans.map((plan, index) => (
//                 <div
//                   key={index}
//                   className="border rounded-lg p-6 bg-gray-50 shadow hover:shadow-lg transition"
//                 >
//                   <h3 className="text-xl font-semibold text-gray-800 capitalize">
//                     {plan.plan_name}
//                   </h3>
//                   <p className="text-gray-500 mt-2">₹{plan.price}</p>
//                   <p className="text-gray-500 mb-4">Duration: {plan.duration_in_days} days</p>
//                   <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//                     Subscribe
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {activeTab === "profile" && (
//           <section className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile</h2>
//             {userProfile ? (
//               <div className="space-y-3">
//                 {Object.entries(userProfile).map(([key, value]) => (
//                   <div key={key} className="flex gap-2">
//                     <span className="font-medium text-gray-600 capitalize">
//                       {key.replace(/_/g, " ")}:
//                     </span>
//                     <span className="text-gray-800">
//                       {Array.isArray(value)
//                         ? value.join(", ")
//                         : typeof value === "object" && value !== null
//                         ? JSON.stringify(value)
//                         : value?.toString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">Loading profile...</p>
//             )}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }










// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlans } from "../../slices/plansSlice";
// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("plans");
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { items: plans, status, error } = useSelector((state) => state.plans);

//   const handleLogout = () => {
//     sessionStorage.removeItem("id_token");
//     navigate("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login");
//   };

//   useEffect(() => {
//     if (activeTab === "profile") {
//       const token = sessionStorage.getItem("id_token");
//       if (token) {
//         fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/authorized", {
//           method: "GET",
//           headers: {
//             Authorization: token,
//           },
//         })
//           .then((res) => {
//             if (!res.ok) throw new Error("Failed to fetch user profile");
//             return res.json();
//           })
//           .then((data) => setUserProfile(data))
//           .catch((err) => {
//             console.error(err);
//             setUserProfile(null);
//           });
//       }
//     } else if (activeTab === "plans") {
//       dispatch(getPlans());
//     }
//   }, [activeTab, dispatch]);

//   const transformedPlans =
//     plans && plans.plans && Array.isArray(plans.plans)
//       ? plans.plans.map((planName, index) => ({
//           plan_name: planName,
//           price: plans.price?.[index] || 0,
//           duration_in_days: plans.Days?.[index] || 0,
//         }))
//       : [];

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Navbar */}
//       <header className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-blue-700">Hire Sense</h1>
//           <div className="space-x-4">
//             <button
//               onClick={() => setActiveTab("plans")}
//               className={`px-5 py-2 rounded-md font-semibold transition ${
//                 activeTab === "plans"
//                   ? "bg-blue-600 text-white"
//                   : "bg-blue-100 text-blue-800 hover:bg-blue-200"
//               }`}
//             >
//               Plans
//             </button>
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`px-5 py-2 rounded-md font-semibold transition ${
//                 activeTab === "profile"
//                   ? "bg-blue-600 text-white"
//                   : "bg-blue-100 text-blue-800 hover:bg-blue-200"
//               }`}
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-5 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 py-10 px-6 max-w-6xl mx-auto w-full">
//         {activeTab === "plans" && (
//           <section className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Plans</h2>
//             {status === "loading" && <p className="text-gray-500">Loading plans...</p>}
//             {status === "failed" && <p className="text-red-500">{error}</p>}
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-6">
//               {transformedPlans.map((plan, index) => (
//                 <div
//                   key={index}
//                   className="border rounded-lg p-6 bg-gray-50 shadow hover:shadow-lg transition"
//                 >
//                   <h3 className="text-xl font-semibold text-gray-800 capitalize">
//                     {plan.plan_name}
//                   </h3>
//                   <p className="text-gray-500 mt-2">₹{plan.price}</p>
//                   <p className="text-gray-500 mb-4">Duration: {plan.duration_in_days} days</p>
//                   <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//                     Subscribe
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {activeTab === "profile" && (
//           <section className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile</h2>
//             {userProfile ? (
//               <div className="space-y-4">
//                 <div>
//                   <span className="font-medium text-gray-600">Name:</span>{" "}
//                   <span className="text-gray-800">{userProfile.given_name}</span>
//                 </div>
//                 <div>
//                   <span className="font-medium text-gray-600">Email:</span>{" "}
//                   <span className="text-gray-800">{userProfile.emails?.[0]}</span>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-gray-500">Loading profile...</p>
//             )}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }
