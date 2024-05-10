import { useState, useEffect } from "react";
import MyFooter from "../components/Footer";
import CallToAction from "../components/CallToAction";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Card, Progress, Popover, Button } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Predictions() {
  const [forecast, setForecast] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      const city = "Quezon City";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        const filteredForecast = filterForecast(response.data.list);
        setForecast(filteredForecast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const filterForecast = (forecastList) => {
    return forecastList.filter((forecast) => {
      const date = new Date(forecast.dt * 1000);
      return date.getHours() >= 15 && date.getHours() < 18;
    });
  };

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://metro.pythonanywhere.com/predict"
        );
        setForecastData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pollutants = [
    {
      name: "PM2.5",
      description: "Particulate matter that is 2 ½ microns or less in width.",
      color: "bg-blue-500",
    },
    {
      name: "PM10",
      description: "Particulate matter that is 10 microns or less in diameter.",
      color: "bg-green-500",
    },
    {
      name: "VOCS",
      description:
        "Volatile organic compounds are emitted as gases from certain solids or liquids.",
      color: "bg-yellow-500",
    },
    {
      name: "CO",
      description:
        "Carbon monoxide is an odorless, colorless gas formed by the incomplete combustion of fuels.",
      color: "bg-red-500",
    },
    {
      name: "O₃",
      description:
        "Ozone is a gas created by the reaction between oxides of nitrogen and volatile organic compounds.",
      color: "bg-purple-500",
    },
  ];
  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col gap-6 pt-24 sm:p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold lg:text-5xl ">What is smog?</h1>
          <p className="text-sm sm:text-md text-justify sm:text-left">
            Smog is a type of air pollution that occurs when pollutants, such as
            smoke, dust, and gases, mix with fog or water vapor in the air. It
            often appears as a thick, hazy cloud that can linger over urban
            areas. Smog can have harmful effects on health, causing respiratory
            problems, eye irritation, and exacerbating conditions like asthma.
            It is primarily caused by vehicle emissions, industrial activity,
            and the burning of fossil fuels.
          </p>{" "}
          <Link
            to="/monitoring"
            className="text-xs sm:text-sm text-blue-800 dark:text-blue-400 font-bold hover:underline"
          >
            Check Air Quality!
          </Link>
        </div>

        <div className="w-full flex flex-col sm:flex-row mx-auto justify-evenly p-4 md:p-8 lg:p-0">
          <div className="mx-auto p-4 sm:p-0">
            <h1 className="text-2xl sm:text-3xl">Weather Forecasting</h1>
            <div className="py-2">
              <i className="text-center text-sm md:text-md lg:text-lg">
                <small>
                  Click the accordions to see more information about the
                  weather!
                </small>
              </i>
            </div>
            {loading && (
              <div className="flex justify-center items-center h-2xl">
                <Spinner size="xl" />
                Loading Forecast Data...
              </div>
            )}{" "}
            {
              <div className="max-w-3xl mx-auto">
                {forecast.map((day, index) => (
                  <div key={index} className="accordionItem">
                    <div
                      className="accordionTitle"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div
                        className="dailyItem dark:bg-slate-700"
                        style={{ opacity: 1, transform: "none" }}
                      >
                        <img
                          src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                          className="icon-small"
                          alt="weather"
                        />
                        <label className="day">
                          {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </label>
                        <label className="description">
                          {day.weather[0].description}
                        </label>
                        <label className="minMax dark:text-slate-100">
                          {day.main.temp}°C
                        </label>
                      </div>
                    </div>
                    {activeIndex === index && (
                      <div className="accordionContent">
                        <div
                          className="dailyDetailsGrid"
                          style={{ opacity: 1, transform: "none" }}
                        >
                          <div className="dailyDetailsGridItem">
                            <label>Wind Speed:&nbsp;</label>
                            <label>{day.wind.speed} m/s</label>
                          </div>
                          <div className="dailyDetailsGridItem">
                            <label>Wind Direction:&nbsp;</label>
                            <label>{getWindDirection(day.wind.deg)}</label>
                          </div>
                          <div className="dailyDetailsGridItem">
                            <label>Humidity:&nbsp;</label>
                            <label>{day.main.humidity}%</label>
                          </div>
                          <div className="dailyDetailsGridItem">
                            <label>Pressure:&nbsp;</label>
                            <label>{day.main.pressure} hPa</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="mx-auto">
            <img
              src="/forecasting.png"
              alt="forecasting icon"
              className="sm:inline sm:w-96 sm:h-96 hidden"
            />
          </div>
        </div>
        <div className="p-4">
          <Card className="max-w-full border-teal-500 dark:border-teal-100 border-double border-2">
            <h1 className="text-center font-bold text-xl sm:text-2xl">
              Smog and Air Quality Forecasting
            </h1>
            <i className="text-center text-sm md:text-md lg:text-lg">
              <small>Click or hover the buttons for more information!</small>
            </i>

            <div className="p-4">
              {loading ? (
                <p>No data available.</p>
              ) : forecastData.length > 0 ? (
                forecastData.map((dayData, dayIndex) => {
                  const date = new Date(); // Today's date
                  date.setDate(date.getDate() + dayIndex); // Increment date by index
                  const dateString = date.toLocaleDateString("en-US", {
                    weekday: "long", // e.g., Monday
                    year: "numeric", // e.g., 2024
                    month: "long", // e.g., January
                    day: "numeric", // e.g., 31
                  });

                  return (
                    <div key={dayIndex} className="mb-4">
                      <h2 className="text-lg font-semibold text-center dark:text-white">
                        {dateString}
                      </h2>
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          margin: "auto",
                          paddingTop: "20px",
                          zIndex: "100",
                        }}
                      >
                        {dayData[5] !== undefined ? (
                          <CircularProgressbar
                            value={dayData[5]}
                            maxValue={100}
                            text={`${dayData[5].toFixed(0)}%`}
                          />
                        ) : (
                          <p>Data for Smog Index is missing</p>
                        )}
                      </div>
                      <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-4 justify-center gap-4 mt-4">
                        {dayData.slice(0, 5).map((value, index) => (
                          <Card
                            key={index}
                            className="max-w-sm flex items-center p-4 gap-4"
                          >
                            <div style={{ width: 80, height: 80 }}>
                              {typeof value === "number" ? (
                                <CircularProgressbar
                                  value={value}
                                  maxValue={500}
                                  text={`${value.toFixed(0)} aqi`}
                                />
                              ) : (
                                <p>Data for index {index} is missing</p>
                              )}
                            </div>
                            <Popover
                              trigger="hover"
                              placement="top"
                              content={
                                <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                                  <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                      {pollutants[index].name}
                                    </h3>
                                  </div>
                                  <div className="px-3 py-2">
                                    <p>{pollutants[index].description}</p>
                                  </div>
                                </div>
                              }
                            >
                              <Button className="w-full">
                                {pollutants[index].name}
                              </Button>
                            </Popover>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center items-center h-64">
                  <Spinner aria-label="Loading..." />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      <CallToAction />
      <MyFooter />
    </>
  );
}
