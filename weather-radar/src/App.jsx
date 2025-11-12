// App.jsx
// next time - reset - after the timeline reset to the latest day. 
// while switching the layer, clear the previous layer.
// timeline AUG t at 6:00am, i dont want keyword at
// data - fireperimter is the latest used 
// current is - dixie_predicted

// SOlid four colours, brown - burnt, red highly likely orange likely and yellow low likely 
// under timeline only have three Circles, forecast, interventions wiht lock sign ( display only ), all layers



import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MainMenuHeader from './components/MainMenuHeader';
import MapControlsPanel from './components/MapControlsPanel';
import Legend from './components/Legend';

 const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [selectedMainLayer, setSelectedMainLayer] = useState('Radar');
  const [geoTimestamps, setGeoTimestamps] = useState([]);
  const [currentTimestampIndex, setCurrentTimestampIndex] = useState(0);
  const [nowIndex, setNowIndex] = useState(-1);
  const [radarAutoplay, setRadarAutoplay] = useState(false);



  function roundToNearest6Hours(date) {
    const hours = date.getHours();
    const roundedHours = Math.round(hours / 6) * 6;
    date.setHours(roundedHours, 0, 0, 0);
    return date;
  }
  
  // useEffect(() => {
  //   fetch('/data/dixie_20250819_predict.geojson') //fireperimeter_past
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const ts = Array.from(
  //         new Set(
  //           data.features.map((f) => f.properties.timestamp)
  //         )
  //       ).sort((a, b) => new Date(a) - new Date(b));
  //       setGeoTimestamps(ts);
        
  //     });
  // }, []);

  useEffect(() => {
    const observedDataPromise = fetch('/data/dixie_20250819_observed.geojson').then(res => res.json());
    const predictedDataPromise = fetch('/data/dixie_20250819_predict.geojson').then(res => res.json());

    Promise.all([observedDataPromise, predictedDataPromise])
      .then(([observedData, predictedData]) => {
        const observedTimestamps = observedData.features.map(f => f.properties.timestamp);
        const predictedTimestamps = predictedData.features.map(f => f.properties.timestamp);
        
        // Combine and get unique timestamps
        const allTimestamps = Array.from(new Set([...observedTimestamps, ...predictedTimestamps]));
        
        // Sort chronologically
        allTimestamps.sort((a, b) => new Date(a) - new Date(b));
        
        setGeoTimestamps(allTimestamps);
      })
      .catch(error => console.error("Error fetching GeoJSON files:", error));
  }, []);


  useEffect(() => {
    if (geoTimestamps.length === 0) return;
  
    const now = new Date("2025-08-19 12:00"); // or new Date()
    const nearest = roundToNearest6Hours(now);
    const nearestStr = nearest
      .toLocaleString("sv-SE", { hour12: false })
      .replace("T", " ")
      .slice(0, 16);
  
    const idx = geoTimestamps.indexOf(nearestStr);
    const actualNowIndex = idx !== -1 ? idx : 0;
    setNowIndex(actualNowIndex);
    setCurrentTimestampIndex(actualNowIndex);
  }, [geoTimestamps]);

  useEffect(() => {
    if (radarAutoplay && geoTimestamps.length > 0) {
      const interval = setInterval(() => {
        setCurrentTimestampIndex(prev => {
          if (prev < geoTimestamps.length - 1) {
            return prev + 1; // move to next timestamp
          } else {
            setRadarAutoplay(false);
            setCurrentTimestampIndex(geoTimestamps.length - 1);
            return geoTimestamps.length-1;
          }
        });
      }, 1000); // 1 second per frame (adjust speed here)
  
      return () => clearInterval(interval);
    }
  }, [radarAutoplay, geoTimestamps]);
  
  
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapboxgl.accessToken = mapboxToken;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.4194, 37.7749],
        zoom: 6,
      });
    }
  }, []);

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const removePreviousLayer = () => {
      const layers = ['Forecast', 'forecast72', 'topography', 'temperature'];
      layers.forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
        if (map.getSource(id)) map.removeSource(id);
      });

      // Remove terrain (if topography was active)
      if (map.getTerrain()) {
        map.setTerrain(null);
        if (map.getSource('mapbox-dem')) {
          map.removeSource('mapbox-dem');
        }
      }
    };

    const addSelectedLayer = () => {
      switch (selectedMainLayer) {
        case 'Radar':
          map.addSource('radar', {
            type: 'raster',
            // url : "mapbox://styles/mapbox/streets-v12",
            tiles: [`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`],
            tileSize: 256,
          });
          map.addLayer({ id: 'radar', type: 'raster', source: 'radar', paint: { 'raster-opacity': 0.3 } });
          break;

        case '24-Hour Forecast':
          map.addSource('forecast24', {
            type: 'raster',
            // tiles: ['https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY'],
            tileSize: 256,
          });
          map.addLayer({ id: 'forecast24', type: 'raster', source: 'forecast24' });
          break;

        case '72-Hour Forecast':
          map.addSource('forecast72', {
            type: 'raster',
            // tiles: ['https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY'],
            tileSize: 256,
          });
          map.addLayer({ id: 'forecast72', type: 'raster', source: 'forecast72', paint: { 'raster-opacity': 0.5 } });
          break;

        case 'Topography':
          map.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.terrain-rgb',
            tileSize: 512,
            maxzoom: 14,
          });
          map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
          map.addLayer({
            id: 'topography',
            type: 'hillshade',
            source: 'mapbox-dem',
            layout: {},
            paint: {},
          });
          break;

    // case 'Wildfire':
    //   fetch('/data/dixie_20250819_predict.geojson')
    //     .then(res => res.json())
    //     .then(data => {

    //       const currentTime = geoTimestamps[currentTimestampIndex];

    //       const featuresToDisplay = data.features.filter(
    //         f => f.properties.timestamp === currentTime
    //       );

    //       if (map.getLayer("wildfire-extrusion")) {
    //         map.removeLayer("wildfire-extrusion");
    //       }
          
    //       if (map.getSource("wildfire")) {
    //         map.removeSource("wildfire");
    //       }
    //       if (map.getSource('wildfire')) map.removeSource('wildfire');
    
    //       // Step 4: Add source + layers for just that timestamp
    //       map.addSource('wildfire', {
    //         type: 'geojson',
    //         data: { type: 'FeatureCollection', features: featuresToDisplay }
    //       });
    
    //       // map.addLayer({
    //       //   id: 'wildfire-fill',
    //       //   type: 'fill',
    //       //   source: 'wildfire',
    //       //   paint: {
    //       //     'fill-color': ['get', 'color'],
    //       //     'fill-opacity': 0.4
    //       //   }
    //       // });
    
    //       // map.addLayer({
    //       //   id: 'wildfire-outline',
    //       //   type: 'line',
    //       //   source: 'wildfire',
    //       //   paint: {
    //       //     'line-color': ['get', 'color'],
    //       //     'line-width': 2
    //       //   }
    //       // });

    //       map.addLayer({
    //         id: 'wildfire-extrusion',
    //         type: 'fill-extrusion',
    //         source: 'wildfire',
    //         paint: {
    //           // Gradient shading based on probability
    //           'fill-extrusion-color': [
    //             'interpolate',
    //             ['linear'],
    //             ['get', 'probability'],
    //             0.4, '#ffff00',   // yellow
    //             0.6, '#ff7f00',   // orange
    //             0.8, '#ff0000',   // red
    //             1.0, '#5a2d0c'    // brown
    //           ],
          
    //           // Give different heights so high probability polygons "stand out"
    //           'fill-extrusion-height': [
    //             'interpolate',
    //             ['linear'],
    //             ['get', 'probability'],
    //             0.4, 100,   // yellow = shorter
    //             0.6, 300,   // orange
    //             0.8, 600,   // red
    //             1.0, 1000   // brown = tallest
    //           ],
          
    //           // Optional: fade the sides for smoother look
    //           'fill-extrusion-opacity': 0.7
    //         }
    //       });
          
        
    //     })
    //     .catch(err => console.error('Failed to load wildfire polygons:', err));
    //   break;

    case 'Forecast':
      const observedDataPromise = fetch('/data/dixie_20250819_observed.geojson').then(res => res.json());
      const predictedDataPromise = fetch('/data/dixie_20250819_predict.geojson').then(res => res.json());
      
      Promise.all([observedDataPromise, predictedDataPromise])
        .then(([observedData, predictedData]) => {
          const currentTime = geoTimestamps[currentTimestampIndex];
          const allFeatures = [...observedData.features, ...predictedData.features];
          
          const featuresToDisplay = allFeatures.filter(
            f => f.properties.timestamp === currentTime
          );
          
          if (map.getLayer("wildfire-extrusion")) {
            map.removeLayer("wildfire-extrusion");
          }
          if (map.getSource("wildfire")) {
            map.removeSource("wildfire");
          }
    
          map.addSource('wildfire', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: featuresToDisplay }
          });
          
          map.addLayer({
            id: 'wildfire-extrusion',
            type: 'fill-extrusion',
            source: 'wildfire',
            paint: {
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['get', 'probability'],
                0.4, '#ffff00',
                0.6, '#ff7f00',
                0.8, '#ff0000',
                1.0, '#5a2d0c'
              ],
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['get', 'probability'],
                0.4, 100,
                0.6, 300,
                0.8, 600,
                1.0, 1000
              ],
              'fill-extrusion-opacity': 0.7
            }
          });
        })
        .catch(err => console.error('Failed to load wildfire polygons:', err));
      break;
      }
    }

    if (map.isStyleLoaded()) {
      removePreviousLayer();
      addSelectedLayer();
    } else {
      map.once('load', () => {
        removePreviousLayer();
        addSelectedLayer();
      });
    }
  }, [selectedMainLayer,geoTimestamps,currentTimestampIndex]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <MainMenuHeader />
      <Legend/>
      <div className="flex-1 relative">
        {/* Map Container */}
        <div
          ref={mapContainerRef}
          style={{ height: '100vh', width: '100vw' }}
          className="absolute top-0 left-0 right-0 bottom-0"
        />
        {/* Zoom Controls - Left Center */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow hover:bg-gray-100 text-xl"
            title="Zoom In"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in-icon lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow hover:bg-gray-100 text-xl"
            title="Zoom Out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-out-icon lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
          </button>
        </div>
        <div className="absolute bottom-4 right-4 z-50">
          <MapControlsPanel
            selectedMainLayer={selectedMainLayer}
            setSelectedMainLayer={setSelectedMainLayer}
            radarAutoplay={radarAutoplay}
            setRadarAutoplay={setRadarAutoplay}
            geoTimestamps = {geoTimestamps}
            currentTimestampIndex={currentTimestampIndex}
            setCurrentTimestampIndex={setCurrentTimestampIndex}
            nowIndex={nowIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
