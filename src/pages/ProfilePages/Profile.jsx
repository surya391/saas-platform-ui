import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../slices/profileSlice';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const defaultUserId = '123';
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  useEffect(() => {
    dispatch(fetchUserProfile(user_id || defaultUserId));
  }, [dispatch, user_id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <div className="p-8 font-sans">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
      {profile ? (
        <div className="bg-gray-100 p-6 rounded-xl max-w-md shadow-md">
          <p className="mb-2"><span className="font-bold">Name:</span> {profile.name}</p>
          <p className="mb-2"><span className="font-bold">Email:</span> {profile.email}</p>
          <p className="mb-2"><span className="font-bold">Subscription:</span> {profile.subscription_id}</p>
          <p className="mb-2"><span className="font-bold">Contact Limit:</span> {profile.no_of_contacts.limit}</p>
          <p className="mb-2"><span className="font-bold">Pending Contacts:</span> {profile.no_of_contacts.pending}</p>

          <Link
            to={`/update-profile/${user_id || defaultUserId}`}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Profile
          </Link>
        </div>
      ) : (
        <p className="text-gray-600">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
