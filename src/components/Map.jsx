import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";

function Map() {
  const [weatherData, setWeatherData] = useState(null);
  const defaultPosition = [14.631796314523164, 120.99477286115304]; // Manila, Philippines
  const markerIconConst = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconSize: [25, 55],
  });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center mx-auto max-w-6xl flex flex-col justify-center mb-5">
      <h1 className="text-2xl font-bold my-2">Device Location</h1>
      <div className="flex justify-center">
        {weatherData ? (
          <MapContainer
            center={defaultPosition}
            zoom={19} // Setting zoom to max level typically supported
            style={{ height: "400px", width: "80%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker icon={markerIconConst} position={defaultPosition} />
          </MapContainer>
        ) : (
          <p>Loading Map data...</p>
        )}
      </div>
    </div>
  );
}

export default Map;
