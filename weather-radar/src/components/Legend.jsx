import React from 'react';

const Legend = () => {
  return (
    <div className="bg-slate-900 text-white px-6 py-4 shadow flex justify-between items-center">
      {/* <h3 className="text-white text-lg font-semibold mb-2">Wildfire Probability</h3>
       */}
      <div className="flex flex-col items-center w-full">
        {/* The Gradient Bar */}
        <div 
          className="h-4 w-full rounded-full"
          style={{
            background: 'linear-gradient(to right, #ffff00, #ff7f00, #ff0000, #5a2d0c)'
          }}
        ></div>
        
        {/* The Labels */}
        <div className="flex justify-between w-full mt-2 text-white text-xs">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Extreme</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;