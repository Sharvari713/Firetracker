import React, { useState, useEffect } from "react";

const AllLayers = ({
  isVisible,
  onClose,
  mainMapLayer,
  setMainMapLayer,
  radarAutoplay,
  setRadarAutoplay,
  timestamps,
  currentTimestampIndex,
  setCurrentTimestampIndex,
  nowIndex
}) => {
  const [activeTab, setActiveTab] = useState("layers");
  const [mapStyle, setMapStyle] = useState("Light");
  const [expandMainLayer, setExpandMainLayer] = useState(false);
  // const timestamps = timestamps || [];

  const layersData = [
    {
      name: "Radar",
      description: "Track rain, snow and sleet 6 hours ahead of time.",
      image: "https://openweathermap.org/img/wn/10d.png",
    },
    {
      name: "24-Hour Future Radar",
      description: "Don’t just track storms. Outsmart them.",
      image: "https://openweathermap.org/img/wn/11d.png",
    },
    {
      name: "Wildfire",
      description:
        "Shows the wildfire as represented by colors from orange to brown.",
      image: "https://openweathermap.org/img/wn/01d.png",
    },
    {
      name: "Topography",
      description: "View terrain elevation with hillshading.",
      image:
        "https://www.flaticon.com/free-icon/topographic_4258579?term=topographical&page=1&position=5&origin=search&related_id=4258579",
    },
  ];

  const getDayAndMonth = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${day}`;
  };
 
  
  if (!isVisible) return null;

  return (
    // <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-2xl p-4 w-[360px] max-w-md">
    //   <button
    //     onClick={onClose}
    //     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50"
    //   >
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    //       <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    //     </svg>
    //   </button>

    //   <div className="sticky top-0 bg-white z-10">
    //     <div className="text-center font-semibold text-lg mb-2">Tue 3:30p</div>
    //     <div className="flex flex-col items-center mb-4">
    //       <div className="flex items-center gap-2 w-full">
    //         <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
    //           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
    //             <path fillRule="evenodd" d="M6 4l10 6-10 6V4z" clipRule="evenodd" />
    //           </svg>
    //         </button>
    //         <div className="flex flex-col w-full">
    //           <input type="range" min="0" max="100" className="w-full" />
    //           <div className="flex justify-between text-xs text-gray-500 px-1">
    //             {['2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p'].map((label) => (
    //               <span key={label}>{label}</span>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="h-[1px] bg-gray-200"></div>
    //   </div>
    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-2xl p-4 w-[360px] max-w-md">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="sticky top-0 bg-white z-10">
        <div className="text-center font-semibold text-lg mb-2">
          {timestamps.length > 0
          ? new Date(timestamps[currentTimestampIndex]).toLocaleString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })
            : "Loading..."}
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-2 w-full">

          <button
              className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-1 text-sm font-medium"
              onClick={() => setRadarAutoplay(!radarAutoplay)}
            >
              {radarAutoplay ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>}
            </button>
            <div className="flex flex-col w-full relative h-16 ">
              <input
                type="range"
                min="0"
                max={timestamps.length - 1}
                value={currentTimestampIndex}
                onChange={(e) => setCurrentTimestampIndex(parseInt(e.target.value))}
                className="w-full absolute top-1/2 -translate-y-1/2 "
              />
              {/* <div className="flex justify-between text-xs text-gray-500 px-1">
                  {timestamps.map((t, i) => {
                    const date = new Date(t);
                    const isStartOfDay = date.getHours() === 0 && date.getMinutes() === 0;
                    return isStartOfDay ? (
                      <span key={t}>
                        {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    ) : (
                      <span
                        key={t}
                        className="w-[1px] h-3 bg-gray-400 inline-block"
                        aria-hidden="true"
                      />
                    );
                  })}
              </div> */}
              <div className="flex justify-between w-full absolute bottom-0 left-0 right-0">
                  {timestamps.map((t, i) => {
                    const date = new Date(t);
                    const hours = date.getHours();
                    const isStartOfDay = hours === 0;
                    const isNoon = hours === 12;
                    const is6AM = hours === 6;
                    const is6PM = hours === 18;

                    let label = null;
                    let tickClass = "h-3 w-px bg-gray-400"; // Default for small ticks
                    
                    if(i === nowIndex){
                      label = "Now"
                      tickClass = "h-5 w-0.5 bg-blue-600";
                    }if (isStartOfDay) {
                      label = date.toLocaleString('en-US', { day: 'numeric' });
                      tickClass = "h-5 w-0.5 bg-gray-700"; 
                    } else if (is6AM || isNoon || is6PM) {
                      // label = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
                      tickClass = "h-3 w-px bg-gray-500"; // Medium tick for 6-hour marks
                    } else {
                        
                        tickClass = "h-2 w-px bg-gray-400";
                    }

                    return (
                      <div
                        key={t}
                        className="flex flex-col items-center justify-start absolute"
                        style={{
                          left: `${(i / (timestamps.length - 1)) * 100}%`,
                          transform: 'translateX(-50%)'
                        }}
                        onClick={() => setCurrentTimestampIndex(i)}
                      >
                        <div className={`-mt-6 ${tickClass}`}></div>
                        {label && (
                          <span className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                            {label}
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gray-200"></div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Map Options</h2>
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "layers"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("layers")}
          >
            Layers and Styles
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "specialty"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("specialty")}
          >
            Specialty Maps
          </button>
        </div>

        {activeTab === "layers" && (
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-600">
              Make your map your own. Choose your main map layer, then add on
              any additional weather conditions you want. You can even change
              the map style and radar speed.
            </p>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">Radar Timeline Autoplay</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={radarAutoplay}
                  onChange={() => setRadarAutoplay(!radarAutoplay)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">Map Style</span>
              <button className="flex items-center text-blue-600 hover:underline">
                {mapStyle}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>

            <div className="py-2 border-b border-gray-200">
              <button
                onClick={() => setExpandMainLayer(!expandMainLayer)}
                className="flex justify-between items-center w-full text-gray-700"
              >
                <span>Main map layer</span>
                <span className="text-blue-600 flex items-center">
                  {mainMapLayer}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>
              {/* {expandMainLayer && (
                <MapLayerManager
                mainMapLayer={mainMapLayer}
                setMainMapLayer={setMainMapLayer}
                />
              )} */}
              {expandMainLayer && (
                <div className="mt-3 space-y-4">
                  {layersData.map((layer) => (
                    <div
                      key={layer.name}
                      className={`flex flex-col p-3 rounded-lg border ${
                        mainMapLayer === layer.name
                          ? "border-blue-500"
                          : "border-gray-200"
                      } cursor-pointer`}
                      onClick={() => {
                        setMainMapLayer(layer.name);
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={layer.image}
                          alt={layer.name}
                          className="w-12 h-12 rounded-full border border-gray-300"
                        />
                        <div className="flex-1">
                          <div
                            className={`font-semibold ${
                              mainMapLayer === layer.name
                                ? "text-blue-600"
                                : "text-gray-800"
                            }`}
                          >
                            {layer.name}
                          </div>
                          <div className="text-xs text-gray-500 leading-tight">
                            {layer.description}
                          </div>
                        </div>
                        <div className="mt-1">
                          <input
                            type="radio"
                            checked={mainMapLayer === layer.name}
                            readOnly
                          />
                        </div>
                      </div>
                      {mainMapLayer === layer.name && (
                        <div className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">
                              Opacity
                            </span>
                            <span className="font-semibold text-gray-800">
                              72%
                            </span>
                          </div>
                          <input type="range" className="w-full" />
                          <div className="mt-3 flex items-center space-x-4 text-sm font-medium">
                            <span className="text-gray-800">
                              Animation Speed
                            </span>
                            <div className="flex space-x-2">
                              <span className="text-gray-800">0.5x</span>
                              <span className="text-gray-800">1x</span>
                              <span className="text-gray-800">2x</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">Add-on layers</span>
              <button className="flex items-center text-blue-600 hover:underline">
                Location Marker
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === "specialty" && (
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-600">
              Explore various specialty maps for different weather phenomena.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Temperature Map</li>
              <li>Wind Speed Map</li>
              <li>Cloud Cover Map</li>
              <li>UV Index Map</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLayers;
