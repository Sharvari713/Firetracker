import React from 'react';
import { FaFire } from "react-icons/fa";

const Legend = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-3 rounded-xl shadow-md border border-gray-200 flex flex-col items-center select-none transition-all duration-200 hover:shadow-lg">

      {/* Inline Legend */}
      <div className="flex justify-center items-center space-x-6 text-sm font-medium text-gray-700">
        <div className="flex items-center space-x-2">
          <span>Burning</span>
          <div className="h-2.5 w-14 rounded-full bg-red-600 shadow-sm"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span>More Likely</span>
          <div className="h-2.5 w-14 rounded-full bg-orange-500 shadow-sm"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span>Less Likely</span>
          <div className="h-2.5 w-14 rounded-full bg-yellow-400 shadow-sm"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span>Burnt</span>
          <div className="h-2.5 w-14 rounded-full bg-[#8B4513] shadow-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
