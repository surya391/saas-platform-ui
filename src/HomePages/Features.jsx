import React from "react";
import { FaCheckCircle, FaRocket, FaUsers, FaCog } from 'react-icons/fa'; // Import icons

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-blue-800 mb-12 text-center animate-fade-in">
        Features of Caze Hire Sense
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 w-full max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="text-blue-600 text-4xl mb-4">
            <FaCheckCircle />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">Easy Job Posting</h3>
          <p className="text-gray-700 mb-6">Quickly create and post job openings with a simple, user-friendly interface.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="text-blue-600 text-4xl mb-4">
            <FaRocket />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">Fast Hiring Process</h3>
          <p className="text-gray-700 mb-6">Speed up your recruitment with automated candidate screenings and real-time tracking.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="text-blue-600 text-4xl mb-4">
            <FaUsers />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">Collaborative Teamwork</h3>
          <p className="text-gray-700 mb-6">Collaborate seamlessly with your team to review applicants and make better hiring decisions.</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="text-blue-600 text-4xl mb-4">
            <FaCog />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">Customizable Workflows</h3>
          <p className="text-gray-700 mb-6">Tailor the hiring process to fit your specific needs and streamline operations with customizable workflows.</p>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
          Explore More Features
        </button>
      </div>
    </div>
  );
}
