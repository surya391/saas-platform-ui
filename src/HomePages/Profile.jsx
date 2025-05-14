import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login page if no user is found
      window.location.href = "https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/login";
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {user ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
          <div className="mb-4">
            <strong>Name:</strong> <span>{user.name}</span>
          </div>
          <div className="mb-4">
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div className="mb-4">
            <strong>Subscription:</strong> <span>{user.subscription_id}</span>
          </div>
          <div className="mb-4">
            <strong>Number of Contacts:</strong> <span>{user.no_of_contacts}</span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
