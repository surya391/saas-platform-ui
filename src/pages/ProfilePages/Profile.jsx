import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../slices/profileSlice';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const defaultUserId = '123';

  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.isLoading); // Fix key: `isLoading`
  const error = useSelector((state) => state.profile.error);

  useEffect(() => {
    dispatch(fetchUserProfile(user_id || defaultUserId));
  }, [dispatch, user_id]);

  if (loading) return <p className="text-center mt-6 text-lg font-semibold text-blue-500">Loading profile...</p>;
  if (error) return <p className="text-center mt-6 text-lg font-semibold text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gray-50 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>

      {profile ? (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="space-y-4 text-gray-700">
            <p><span className="font-semibold">👤 Name:</span> {profile.name}</p>
            <p><span className="font-semibold">📧 Email:</span> {profile.email}</p>
            <p><span className="font-semibold">📦 Subscription:</span> {profile.subscription_id}</p>
            <p><span className="font-semibold">📈 Contact Limit:</span> {profile.no_of_contacts?.limit}</p>
            <p><span className="font-semibold">⏳ Pending Contacts:</span> {profile.no_of_contacts?.pending}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
