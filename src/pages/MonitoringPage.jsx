import { useEffect, useState } from "react";
import Temperature from "../components/Temperature";
import Highlights from "../components/Highlights";
import MyFooter from "../components/Footer";
import CallToAction from "../components/CallToAction";
import { Card, Spinner } from "flowbite-react";
import { Table } from "flowbite-react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebaseConfig";

export default function MonitoringPage() {
  const [city, setCity] = useState("La Lloma, Quezon City");
  const [weatherData, setWeatherData] = useState(null);
  const [pollutantsData, setPollutantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highestPollutant, setHighestPollutant] = useState(null);

  const api = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${api}&q=Quezon City&aqi=yes`;

    fetch(apiUrl)
      .then((res) => {
        setLoading(true);
        if (!res.ok) {
          setLoading(false);
          throw new Error("Could not get data");
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

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

        // Find the highest pollutant based on AQI value
        const highestPollutant = newData.reduce(
          (maxPollutant, currentPollutant) => {
            return currentPollutant.aqi > maxPollutant.aqi
              ? currentPollutant
              : maxPollutant;
          },
          { name: "", aqi: -Infinity } // Initialize maxPollutant with lowest value
        );

        setHighestPollutant(highestPollutant);
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

  return (
    <>
      <div className="min-h-screen flex flex-col justify-start pt-20 items-center">
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto min-h-96 mb-4 p-4 sm:p-0">
          <div className="flex flex-col justify-center max-w-2xl order-2 lg:order-1">
            <h1 className="py-3 sm:pb-5 text-2xl sm:text-4xl sm:font-bold font-semibold">
              Importance of Weather
            </h1>
            <p className="text-justify sm:text-left">
              Weather plays a crucial role in detecting smog as it influences
              the dispersion, concentration, and behavior of pollutants in the
              atmosphere. Factors like temperature inversions, wind speed, and
              precipitation affect how pollutants disperse and accumulate,
              impacting air quality. For instance, during temperature
              inversions, warm air traps pollutants close to the ground, leading
              to smog buildup.
            </p>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <img src="/air-importance.png" alt="Air Importance Graphic" />
          </div>
        </div>
        <h1 className="self-center py-3 sm:pb-5 text-2xl sm:text-4xl sm:font-bold font-semibold">
          Weather Monitoring
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-2xl">
            <Spinner size="xl" />
            Loading Weather Data...
          </div>
        ) : (
          <Card className="weather-card bg-zinc-300 dark:bg-zinc-700">
            <div className="flex flex-col md:flex-row gap-4 p-5">
              <div className="flex-1">
                {weatherData && (
                  <div>
                    <Temperature
                      setCity={setCity}
                      stats={{
                        temp: weatherData.current.temp_c,
                        condition: weatherData.current.condition.text,
                        isDay: weatherData.current.is_day,
                        location: weatherData.location.name,
                        time: weatherData.location.localtime,
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                {weatherData && (
                  <div>
                    <h1 className="text-2xl mb-4 text-center">
                      Today's Highlights
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Highlights
                        stats={{
                          title: "Wind Status",
                          value: weatherData.current.wind_mph,
                          unit: "mph",
                          direction: weatherData.current.wind_dir,
                        }}
                      />
                      <Highlights
                        stats={{
                          title: "Humidity",
                          value: weatherData.current.humidity,
                          unit: "%",
                        }}
                      />
                      <Highlights
                        stats={{
                          title: "Visibility",
                          value: weatherData.current.vis_miles,
                          unit: "miles",
                        }}
                      />
                      <Highlights
                        stats={{
                          title: "Air Pressure",
                          value: weatherData.current.pressure_mb,
                          unit: "mb",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
        <div className="flex flex-col sm:flex-row justify-evenly">
          <div className="flex flex-col w-11/12 sm:w-2/5 pl-3 justify-center">
            {" "}
            <h3 className="font-bold pt-5 sm:pt-0 text-xl sm:text-3xl mb-3">
              Pollutants
            </h3>
            <p className="text-justify sm:text-left">
              The current Pollutants monitored by MetroBreathe along Quezon City
              are Carbon Monoxide (CO), Volatile organic compounds (VOCs), Ozone
              (O₃), and Particulate Matter (PM 10, PM 2.5). These parameters are
              measured by ppm or parts per million. It is a unit used to
              describe very small concentrations of a substance in a larger
              solution. The current highest pollutant is&nbsp;
              {!loading && highestPollutant && (
                <span>
                  {highestPollutant.name} with a measurement of{" "}
                  {highestPollutant.aqi} ppm.
                </span>
              )}
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-2xl">
              <Spinner size="xl" />
              Loading Pollutants Data...
            </div>
          ) : (
            <div className="text-center p-5">
              <div className="flex flex-col items-center">
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
                          {pollutant.aqi} ppm
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
          )}
        </div>
      </div>
      <CallToAction />
      <MyFooter />
    </>
  );
}
