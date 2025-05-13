

import React from 'react';
import HomeImg from './images/Home4.avif';

const Home = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${HomeImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-slow">
          Caze Hire Sense
        </h1>
        
        {/* Horizontal line below the heading */}
        <div className="h-1 w-24 bg-white mx-auto mb-6 animate-fade-in-slow"></div>

        {/* Optional tagline */}
        <p className="text-xl italic animate-fade-in-slow delay-500">
          "Every job you apply for is a step closer to your dream. Keep going!"
        </p>
      </div>
    </div>
  );
};

export default Home;
