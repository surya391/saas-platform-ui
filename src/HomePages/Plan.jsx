import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../slices/plansSlice";
import { useNavigate } from "react-router-dom";
import HomeImg from "./images/Home4.avif";

export default function Plan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: plans, status, error } = useSelector((state) => state.plans);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPlans());
    }
  }, [dispatch, status]);
  

  const handleSubscribe = (plan) => {
    alert("user clicked subscription");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center py-12"
      style={{
        backgroundImage: `url(${HomeImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-12 text-center animate-fade-in">
        Subscription Plans
      </h1>

      {status === "loading" && <p className="text-white">Loading...</p>}
      {status === "failed" && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 w-full max-w-6xl">
        {Array.isArray(plans) &&
          plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 border border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <h2 className="text-3xl font-semibold text-blue-700 mb-4 capitalize">
                {plan.plan_name}
              </h2>
              <ul className="text-gray-700 mb-6 list-disc list-inside space-y-3">
                <li className="text-lg">Price: ₹{plan.price}</li>
                <li className="text-lg">Contacts: {plan.no_of_contacts}</li>
              </ul>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                onClick={() => handleSubscribe(plan)}
              >
                Subscribe Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}





// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPlans } from "../slices/plansSlice";
// import HomeImg from "./images/Home4.avif";

// export default function Plan() {
//   const dispatch = useDispatch();
//   const { items: plans, status, error } = useSelector((state) => state.plans);

//   useEffect(() => {
//     dispatch(getPlans());
//   }, [dispatch]);

//   const handleSubscribeClick = () => {
//     alert("Subscription button clicked!");
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center py-12"
//       style={{
//         backgroundImage: `url(${HomeImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <h1 className="text-4xl font-bold text-white mb-12 text-center animate-fade-in">
//         Subscription Plans
//       </h1>

//       {status === "loading" && <p className="text-white">Loading...</p>}
//       {status === "failed" && <p className="text-red-600">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 w-full max-w-6xl">
//         {Array.isArray(plans) &&
//           plans.map((plan, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-xl rounded-2xl p-6 border border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
//             >
//               <h2 className="text-3xl font-semibold text-blue-700 mb-4 capitalize">
//                 {plan.plan_name}
//               </h2>
//               <ul className="text-gray-700 mb-6 list-disc list-inside space-y-3">
//                 <li className="text-lg">Price: ₹{plan.price}</li>
//                 <li className="text-lg">Contacts: {plan.no_of_contacts}</li>
//               </ul>
//               <button
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
//                 onClick={handleSubscribeClick}
//               >
//                 Subscribe Now
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

