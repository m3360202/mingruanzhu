import React from 'react';
import { Italiana } from 'next/font/google';
const italiana = Italiana({ weight: '400', subsets: ['latin'] });

const ExplorePage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">

      {/* Main content */}
      <div className="flex flex-col items-center pt-28 px-6">
        <h1 className={`text-5xl ${italiana.className} text-blue-400 mb-8`}>Explore Stories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {/* Placeholder items for the explore grid */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-64 flex flex-col"
            >
              <div className="bg-gray-100 rounded-lg h-40 mb-4"></div>
              <h3 className="text-xl font-medium">Story Example #{item}</h3>
              <p className="text-gray-500 text-sm mt-1">Created by User</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 