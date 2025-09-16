import React, { useState } from 'react';
import { FaPlay, FaLock, FaLayerGroup } from 'react-icons/fa';
import AllLayers from './AllLayers';

export default function MapControlsPanel({ selectedMainLayer, setSelectedMainLayer, radarAutoplay, setRadarAutoplay, currentTimestampIndex,
  setCurrentTimestampIndex, geoTimestamps}) {
  const [showLayersModal, setShowLayersModal] = useState(false);

  const now = new Date();
  const timeString = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const dayString = now.toLocaleDateString(undefined, { weekday: 'short' });

  return (
    <div className="bg-white bg-opacity-95 rounded-xl shadow-lg p-4 w-[360px] text-sm text-gray-800">
      {/* Header */}
      <div className="text-center font-semibold text-lg mb-2">{`${dayString} ${timeString}`}</div>

      {/* Timeline */}
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center gap-2 w-full">
          <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
            <FaPlay size={10} />
          </button>
          <div className="flex flex-col w-full">
            <input type="range" min="0" max="100" className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 px-1">
              {['5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p'].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layers */}
      <div className="flex justify-around items-center mb-3">
        <button onClick={() => setSelectedMainLayer('Radar')} className="flex flex-col items-center">
          <img
            alt="Radar"
            className={`w-12 h-12 rounded-full border-2 ${selectedMainLayer === 'Radar' ? 'border-blue-500' : 'border-transparent'}`}
          />
          <span className={`text-xs mt-1 ${selectedMainLayer === 'Radar' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
            Radar
          </span>
        </button>

        <button onClick={() => setSelectedMainLayer('24-Hour Future Radar')} className="flex flex-col items-center">
          <img src="https://openweathermap.org/img/wn/10d.png" alt="24-Hour" className="w-12 h-12 rounded-full" />
          <span className={`text-xs mt-1 ${selectedMainLayer === '24-Hour Future Radar' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
            24-Hour<br />Future Radar
          </span>
        </button>

        <button onClick={() => setSelectedMainLayer('72-Hour Future Radar')} className="flex flex-col items-center relative">
          <img src="https://openweathermap.org/img/wn/11d.png" alt="72-Hour" className="w-12 h-12 rounded-full" />
          <FaLock className="absolute right-0 top-0 text-xs text-black bg-white rounded-full" />
          <span className={`text-xs mt-1 ${selectedMainLayer === '72-Hour Future Radar' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
            72-Hour<br />Future Radar
          </span>
        </button>

        <button
          onClick={() => setShowLayersModal(!showLayersModal)}
          className="flex flex-col items-center bg-black text-white rounded-full w-12 h-12 justify-center"
        >
          <FaLayerGroup size={50} />
          <span className="text-xs mt-1 text-black font-semibold">All Layers</span>
        </button>
      </div>

      {/* Toggle */}
      <div className="text-center text-xs text-blue-600 font-semibold cursor-pointer">
        <span>▼ Hide menu</span>
      </div>

      {showLayersModal && (
        <AllLayers
          isVisible={showLayersModal}
          onClose={() => setShowLayersModal(false)}
          mainMapLayer={selectedMainLayer}
          setMainMapLayer={setSelectedMainLayer}
          radarAutoplay={radarAutoplay}
          setRadarAutoplay={setRadarAutoplay}
          timestamps={geoTimestamps}
          currentTimestampIndex={currentTimestampIndex}
          setCurrentTimestampIndex={setCurrentTimestampIndex}
        />
      )}
    </div>
  );
}