import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../slices/profileSlice';
import { useParams, useNavigate } from 'react-router-dom';

const DashboardProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_id } = useParams();
    const defaultUserId = '123';

    const profile = useSelector((state) => state.profile.data);
    const loading = useSelector((state) => state.profile.isLoading);
    const error = useSelector((state) => state.profile.error);

    useEffect(() => {
        dispatch(fetchUserProfile(user_id || defaultUserId));
    }, [dispatch, user_id]);

    if (loading)
        return (
            <p className="text-center mt-6 text-lg font-semibold text-blue-500">
                Loading profile...
            </p>
        );
    if (error)
        return (
            <p className="text-center mt-6 text-lg font-semibold text-red-500">
                Error: {error}
            </p>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 font-sans">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                {/* <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Dashboard</h3>
          <ul className="space-y-3 text-gray-700 font-medium">
            <li className="hover:bg-blue-100 px-4 py-2 rounded cursor-pointer">🏠 Overview</li>
            <li className="hover:bg-blue-100 px-4 py-2 rounded cursor-pointer">📁 Plans</li>
            <li className="hover:bg-blue-100 px-4 py-2 rounded cursor-pointer">👤 Profile</li>
            <li className="hover:bg-blue-100 px-4 py-2 rounded cursor-pointer">📨 Messages</li>
            <li className="hover:bg-blue-100 px-4 py-2 rounded cursor-pointer">⚙️ Settings</li>
          </ul>
        </aside> */}

                {/* Profile Info */}
                <main className="w-full md:w-3/4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <span className="text-xl">←</span>
                        <span className="font-semibold">Back</span>
                    </button>

                    <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>

                    {profile ? (
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                            <div className="space-y-4 text-gray-700 text-lg">
                                <p>
                                    <span className="font-semibold">👤 Name:</span> {profile.name}
                                </p>
                                <p>
                                    <span className="font-semibold">📧 Email:</span> {profile.email}
                                </p>
                                <p>
                                    <span className="font-semibold">📦 Subscription:</span>{' '}
                                    <b>{profile.subscription ?? 'None'}</b>
                                </p>

{/*                                 
                <p>
                  <span className="font-semibold">📈 Contact Limit:</span>{' '}
                  {profile.no_of_contacts?.limit}
                </p>
                <p>
                  <span className="font-semibold">⏳ Pending Contacts:</span>{' '}
                  {profile.no_of_contacts?.pending}
                </p> */}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">No user data available.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardProfile;