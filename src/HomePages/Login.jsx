import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan = JSON.parse(localStorage.getItem("selectedPlan"));

    if (!plan) {
      alert("No subscription plan selected.");
      return;
    }

    try {
      // Step 1: Fetch existing users
      const userRes = await fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/user");
      if (!userRes.ok) throw new Error("Failed to fetch users");

      const users = await userRes.json();
      console.log("Fetched users:", users);

      const existingUser = users.find((u) => u.email === form.email);

      if (existingUser) {
        console.log("User exists:", existingUser);
        // Store the user data in localStorage (or sessionStorage)
        localStorage.setItem("user", JSON.stringify(existingUser));
        navigate("/dashboard");
        return;
      }

      // Step 2: Prepare new user payload
      const userPayload = {
        user_id: "user_" + Math.floor(Math.random() * 10000),
        name: form.name,
        email: form.email,
        subscription_id: plan.id || plan.subscription_id,
        no_of_contacts: plan.no_of_contacts,
      };

      // Step 3: Register new user
      const createRes = await fetch(
        "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPayload),
        }
      );

      if (createRes.ok) {
        alert("User registered successfully!");
        // Store the user data in localStorage (or sessionStorage)
        localStorage.setItem("user", JSON.stringify(userPayload));
        navigate("/dashboard");
      } else {
        const error = await createRes.json();
        alert("Failed: " + (error.message || "Server error"));
      }
    } catch (err) {
      console.error("Error occurred:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Subscribe</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const plan = JSON.parse(localStorage.getItem("selectedPlan"));

//     if (!plan) {
//       alert("No subscription plan selected.");
//       return;
//     }

//     try {
//       // Step 1: Fetch existing users
//       const userRes = await fetch("https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/user");
//       if (!userRes.ok) throw new Error("Failed to fetch users");

//       const users = await userRes.json();
//       const existingUser = users.find((u) => u.email === form.email);

//       if (existingUser) {
//         // alert("User already exists. Redirecting to dashboard...");
//         navigate("/dashboard");
//         return;
//       }

//       // Step 2: Prepare new user payload
//       const userPayload = {
//         user_id: "user_" + Math.floor(Math.random() * 10000),
//         name: form.name,
//         email: form.email,
//         subscription_id: plan.id || plan.subscription_id,
//         no_of_contacts: plan.no_of_contacts,
//       };

//       // Step 3: Register new user
//       const createRes = await fetch(
//         "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userPayload),
//         }
//       );

//       if (createRes.ok) {
//         alert("User registered successfully!");
//         navigate("/dashboard");
//       } else {
//         const error = await createRes.json();
//         alert("Failed: " + (error.message || "Server error"));
//       }
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login to Subscribe</h2>
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="mb-4 w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="mb-4 w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="mb-6 w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const plan = JSON.parse(localStorage.getItem("selectedPlan"));
//     const userPayload = {
//       user_id: "user_" + Math.floor(Math.random() * 10000),
//       name: form.name,
//       email: form.email,
//       subscription_id: plan.id || plan.subscription_id,
//       no_of_contacts: plan.no_of_contacts,
//       // Optional: add password if backend supports it
//     };

//     try {
//       const response = await fetch(
//         "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userPayload),
//         }
//       );

//       if (response.ok) {
//         alert("User registered successfully!");
//         navigate("/dashboard"); // or home
//       } else {
//         const error = await response.json();
//         alert("Failed: " + (error.message || "server error"));
//       }
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login to Subscribe</h2>
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="mb-4 w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="mb-4 w-full p-2 border rounded"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="mb-6 w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
