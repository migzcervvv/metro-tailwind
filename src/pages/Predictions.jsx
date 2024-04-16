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
  const [activeIndex, setActiveIndex] = useState(null); // Adjusted to null for no initially active item
  const [loading, setLoading] = useState(false);
  const value = 66;
  const color = "dark";

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
            <Progress
              progress={50}
              color={`${color}`}
              textLabel="Smog Meter"
              textLabelPosition="outside"
              size="lg"
              labelProgress
              labelText
            />

            <div className="flex flex-wrap justify-center gap-4">
              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  aria-labelledby="default-popover"
                  placement="top"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Particulate Matter 10
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          PM10 is particulate matter that is 10 microns (μm) or
                          less in diameter. It is a mixture of materials that
                          can include soot, metals, salt, and dust.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>PM 10</Button>
                </Popover>
              </Card>

              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  placement="top"
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Particulate Matter 2.5
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          The term fine particles, or particulate matter 2.5
                          (PM2.5), refers to tiny particles or droplets in the
                          air that are 2 ½ microns or less in width. The largest
                          PM2.5 particles are about 30-times smaller than a
                          human hair.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>PM 2.5</Button>
                </Popover>
              </Card>

              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  placement="top"
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Carbon Monoxide
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          Carbon monoxide (CO) is an odorless, colorless gas
                          formed by the incomplete combustion of fuels. When
                          people are exposed to CO gas, the CO molecules will
                          displace the oxygen in their bodies and lead to
                          poisoning.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>CO</Button>
                </Popover>
              </Card>

              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  placement="top"
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Nitrogen Dioxide
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          Nitrogen dioxide, or NO2, is a gaseous air pollutant
                          that forms when fossil fuels such as coal, oil,
                          methane gas (natural gas) or diesel are burned at high
                          temperatures.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>NO₂</Button>
                </Popover>
              </Card>

              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  placement="top"
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Volatile Organic Compounds
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          Volatile organic compounds (VOCs) are emitted as gases
                          from certain solids or liquids. VOCs include a variety
                          of chemicals, some of which may have short- and
                          long-term adverse health effects.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>VOCs</Button>
                </Popover>
              </Card>

              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  placement="top"
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Ozone
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          Ozone (O3) is a gas created by a chemical reaction
                          between oxides of nitrogen (NOx) and volatile organic
                          compounds (VOCs). Motor vehicle exhaust and industrial
                          emissions, gasoline vapors, and chemical solvents as
                          well as natural sources emit NOx and VOCs that help
                          form ozone.
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>O₃</Button>
                </Popover>
              </Card>

              <Card className="max-w-sm">
                <div className="max-w-32 max-h-32">
                  <CircularProgressbar
                    value={value}
                    maxValue={500}
                    text={`${value}%`}
                  />
                </div>{" "}
                <Popover
                  trigger="hover"
                  placement="top"
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3
                          id="default-popover"
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          Sulfur Dioxide
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p>
                          Sulfur dioxide (SO2) is a colorless, reactive air
                          pollutant with a strong odor. This gas can be a threat
                          to human health, animal health, and plant life. The
                          main sources of sulfur dioxide emissions are from
                          fossil fuel combustion and natural volcanic activity
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Button>SO₂</Button>
                </Popover>
              </Card>
            </div>
          </Card>
        </div>
      </div>
      <CallToAction />
      <MyFooter />
    </>
  );
}
