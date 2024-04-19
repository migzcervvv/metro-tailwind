import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { Table } from "flowbite-react";

function MyComponent() {
  const [pollutantsData, setPollutantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = collection(database, "parameters");
        const querySnapshot = await getDocs(value);
        const newData = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .map((item) => [
            { name: "Carbon", aqi: item.carbon },
            { name: "Nitrogen", aqi: item.nitrogen },
            { name: "Ozone", aqi: item.ozone },
            { name: "PM10", aqi: item.pmTen },
            { name: "PM2.5", aqi: item.pmTwo },
            { name: "Sulfur", aqi: item.sulfur },
            { name: "VOCs", aqi: item.vocs },
          ])
          .flat();

        setPollutantsData(newData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAqiColor = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return "#00e400"; // Good (0-50)
    if (aqi <= 100) return "#ffff00"; // Moderate (51-100)
    if (aqi <= 150) return "#ff7e00"; // Unhealthy for Sensitive Groups (101-150)
    if (aqi <= 200) return "#ff0000"; // Unhealthy (151-200)
    if (aqi <= 300) return "#8f3f97"; // Very Unhealthy (201-300)
    if (aqi <= 500) return "#7e0023"; // Hazardous (301-500)
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (pollutantsData.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="pt-20">
      <div className="overflow-x-auto">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Pollutant</Table.HeadCell>
            <Table.HeadCell>AQI</Table.HeadCell>
            <Table.HeadCell>Level</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {pollutantsData.map((pollutant) => (
              <Table.Row
                key={pollutant.name}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="text-lime-950 dark:text-lime-50">
                  {pollutant.name}
                </Table.Cell>
                <Table.Cell
                  style={{
                    backgroundColor: getAqiColor(pollutant.aqi),
                    color: pollutant.aqi > 200 ? "white" : "black",
                  }}
                >
                  {pollutant.aqi} AQI
                </Table.Cell>
                <Table.Cell className="text-lime-950 dark:text-lime-50">
                  {getAqiLevel(pollutant.aqi)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default MyComponent;
