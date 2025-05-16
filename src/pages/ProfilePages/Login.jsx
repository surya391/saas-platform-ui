
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile } from '../../slices/profileSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pre-filled form data
  const [formData, setFormData] = useState({
    id: '123',
    name: 'Surya',
    email: 'sury@gmail.com'
  });

  const [clientErrors, setClientErrors] = useState({});

  const formValidate = () => {
    let errors = {};
    if (!formData.id.trim()) errors.id = "ID is required";
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Enter a valid email";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = formValidate();
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
    } else {
      setClientErrors({});
      try {
        const result = await dispatch(createProfile(formData)).unwrap();
        console.log("Profile Created:", result);
        navigate("/dashboard"); // or any success route
      } catch (error) {
        console.error("Error creating profile:", error);
        alert(error); // optional: show error toast or modal
      }
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {clientErrors.id && <p className="text-sm text-red-500 mt-1">{clientErrors.id}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {clientErrors.name && <p className="text-sm text-red-500 mt-1">{clientErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {clientErrors.email && <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;



// import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createProfile } from '../../slices/profileSlice';

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     email: ''
//   });

//   const [clientErrors, setClientErrors] = useState({});

//   const formValidate = () => {
//     let errors = {};
//     if (!formData.id.trim()) errors.id = "ID is required";
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       errors.email = "Enter a valid email";
//     }
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = formValidate();
//     if (Object.keys(errors).length > 0) {
//       setClientErrors(errors);
//     } else {
//       setClientErrors({});
//       try {
//         const result = await dispatch(createProfile(formData)).unwrap();
//         console.log("Profile Created:", result);
//         navigate("/dashboard"); // or any success route
//       } catch (error) {
//         console.error("Error creating profile:", error);
//         alert(error); // optional: show error toast or modal
//       }
//     }
//   };

//   return (
//     <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen items-center justify-center">
//       <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
//         <h2 className="text-2xl text-gray-800 mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* ID */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">ID</label>
//             <input
//               type="text"
//               value={formData.id}
//               onChange={(e) => setFormData({ ...formData, id: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {clientErrors.id && <p className="text-sm text-red-500 mt-1">{clientErrors.id}</p>}
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {clientErrors.name && <p className="text-sm text-red-500 mt-1">{clientErrors.name}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {clientErrors.email && <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
