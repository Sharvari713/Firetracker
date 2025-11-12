import React, { useState } from "react";
import { FaPlay, FaLock, FaLayerGroup,FaFire, FaCloud } from "react-icons/fa";
import AllLayers from "./AllLayers";

export default function MapControlsPanel({
  selectedMainLayer,
  setSelectedMainLayer,
  radarAutoplay,
  setRadarAutoplay,
  geoTimestamps,
  currentTimestampIndex,
  setCurrentTimestampIndex,
  nowIndex,
}) {
  const [showLayersModal, setShowLayersModal] = useState(false);

  const now = new Date();
  const timeString = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const dayString = now.toLocaleDateString(undefined, { weekday: "short" });

  return (
    <div className="bg-white bg-opacity-95 rounded-xl shadow-lg p-4 w-[360px] text-sm text-gray-800">
      <div id="timeline" className="sticky top-0 bg-white z-0">
        <div id = "datetime" className="text-center font-semibold text-lg">
          {geoTimestamps.length > 0
            ? new Date(geoTimestamps[currentTimestampIndex]).toLocaleString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              )
            : "Loading..."}
        </div>
        <div id = "playtime"className="flex flex-col items-center mb-5">
          <div className="flex items-center gap-2 w-full">
            <button
              id = "playbutton"
              className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-1 text-sm font-medium"
              onClick={() => setRadarAutoplay(!radarAutoplay)}
            >
              {radarAutoplay ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="black"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pause-icon lucide-pause"
                >
                  <rect x="14" y="3" width="5" height="18" rx="1" />
                  <rect x="5" y="3" width="5" height="18" rx="1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="black"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play-icon lucide-play"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              )}
            </button>

            <div className="flex flex-col w-full relative h-16 mb-2">
              <input
                type="range"
                min="0"
                max={geoTimestamps.length - 1}
                value={currentTimestampIndex}
                onChange={(e) =>
                  setCurrentTimestampIndex(parseInt(e.target.value))
                }
                className="w-full absolute top-1/2 -translate-y-1/2"
              />
              <div className="flex justify-between w-full absolute bottom-0 left-0 right-0">
                {geoTimestamps.map((t, i) => {
                  const date = new Date(t);
                  const hours = date.getHours();
                  const isStartOfDay = hours === 0;
                  const isNoon = hours === 12;
                  const is6AM = hours === 6;
                  const is6PM = hours === 18;

                  let label = null;
                  let tickClass = "h-2 w-px bg-gray-400";

                  if (i === nowIndex) {
                    label = "Now";
                    tickClass = "h-5 w-0.5 bg-blue-600";
                  }
                  if (isStartOfDay) {
                    label = date.toLocaleString("en-US", { day: "numeric" });
                    tickClass = "h-3 w-0.5 bg-gray-700";
                  } else if (is6AM || isNoon || is6PM) {
                    tickClass = "h-1 w-px bg-gray-500";
                  } else {
                    tickClass = "h-2 w-px bg-gray-400";
                  }

                  return (
                    <div
                      key={t}
                      className="flex flex-col items-center justify-start absolute"
                      style={{
                        left: `${(i / (geoTimestamps.length - 1)) * 100}%`,
                        transform: "translateX(-50%)",
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
        <div className="h-[2px] bg-gray-300 mb-2"></div>
      </div>

      {/* Layers */}
      <div id ="layers" className="flex justify-around items-center mb-3">
        <button
          id = "Forecast"
          onClick={() => setSelectedMainLayer("Forecast")}
          className="flex flex-col items-center"
        >
        <div
          className={`flex items-center justify-center rounded-full w-12 h-12 border-2 ${
          selectedMainLayer === "Forecast"
          ? "border-blue-500"
          : "border-black"
          }`}
          >
          <FaFire size={22} color="#ff4013" />
        </div>

          <span
            className={`text-xs mt-1 ${
              selectedMainLayer === "Forecast"
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Forecast
          </span>
        </button>

        <button
          onClick={() => setSelectedMainLayer("72-Hour Future Radar")}
          className="flex flex-col items-center relative"
        >
        <div
          className={`flex items-center justify-center rounded-full w-12 h-12 border-2 ${
            selectedMainLayer === "72-Hour Future Radar"
              ? "border-blue-500"
              : "border-black"
          }`}
        >
          <FaCloud size={22} color="#74C0FC" />
          <FaLock className="absolute right-0 top-0 text-xs text-black bg-white rounded-full" />
        </div>
          <span
            className={`text-xs mt-1 ${
              selectedMainLayer === "72-Hour Future Radar"
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Future Radar
          </span>
        </button>

        <button
          onClick={() => setShowLayersModal(!showLayersModal)}
          className="flex flex-col items-center "
        >
           <div className="flex items-center justify-center text-white rounded-full w-12 h-12 border-2 border-black">
              <FaLayerGroup size={18} color="black" />
            </div>
          <span className="text-xs mt-1 text-gray-500 font-semibold">
            All Layers
          </span>
        </button>
      </div>

      {/* Toggle */}
      {/* <div className="text-center text-xs text-blue-600 font-semibold cursor-pointer">
        <span>▼ Hide menu</span>
      </div> */}

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
