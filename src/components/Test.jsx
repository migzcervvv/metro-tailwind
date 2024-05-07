import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirebaseData } from "../redux/store";

const SampleComponent = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchFirebaseData());
  }, [dispatch]);

  const getLatestValues = (data) => {
    const latestValues = {};
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        typeof data[key] === "object" &&
        data[key].Value
      ) {
        // Accessing the 'Value' key of each parameter
        const valueObject = data[key].Value;
        const valueEntries = Object.entries(valueObject);
        if (valueEntries.length > 0) {
          // Assuming entries are ordered and the last one is the latest
          const latestEntry = valueEntries[valueEntries.length - 1];
          latestValues[key] = latestEntry[1]; // Storing only the value part
        }
      }
    }
    return latestValues;
  };

  const getAqiColor = (value) => {
    // Extract numeric part from the value, assuming format "XX.XX ppm"
    const aqi = parseFloat(value);
    // Your existing conditions...
    if (aqi >= 0 && aqi <= 50) return "#00e400";
    if (aqi <= 100) return "#ffff00";
    if (aqi <= 150) return "#ff7e00";
    if (aqi <= 200) return "#ff0000";
    if (aqi <= 300) return "#8f3f97";
    if (aqi <= 500) return "#7e0023";
    return "#ffffff"; // Default color
  };

  const getAqiLevel = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const latestData = data ? getLatestValues(data) : {};

  return (
    <div className="p-40">
      <h2>Sample Component</h2>
      {error && <div>Error: {error.message}</div>}
      {latestData && (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
              <th>AQI Level</th>
            </tr>
          </thead>
          <tbody>
            {latestData &&
              Object.entries(latestData).map(([key, value]) => {
                const aqiValue = parseFloat(value); // Extract the numerical part from the value
                return (
                  <tr
                    key={key}
                    style={{ backgroundColor: getAqiColor(aqiValue) }}
                  >
                    <td>{key}</td>
                    <td>{value}</td>
                    <td>{getAqiLevel(aqiValue)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SampleComponent;
