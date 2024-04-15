import MyFooter from "../components/Footer";
import { FaSmog, FaWind } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { IconContext } from "react-icons";
import { Table, Card } from "flowbite-react";
import {
  TbFilterCheck,
  TbWind,
  TbFaceMask,
  TbAirConditioning,
} from "react-icons/tb";

function getBackgroundColor(indexValue) {
  if (indexValue >= 0 && indexValue <= 50) {
    return "bg-green-400"; // Good (0-50)
  } else if (indexValue >= 51 && indexValue <= 100) {
    return "bg-yellow-400"; // Moderate (51-100)
  } else if (indexValue >= 101 && indexValue <= 150) {
    return "bg-orange-600"; // Unhealthy for Sensitive Groups (101-150)
  } else if (indexValue >= 151 && indexValue <= 200) {
    return "bg-red-600"; // Unhealthy (151-200)
  } else if (indexValue >= 201 && indexValue <= 300) {
    return "bg-purple-700"; // Very Unhealthy (201-300)
  } else if (indexValue >= 301 && indexValue <= 500) {
    return "bg-red-900 text-white"; // Hazardous (301-500)
  } else {
    return "bg-white"; // Default color
  }
}

export default function QualityPage() {
  return (
    <>
      <div className="min-h-screen max-w-6xl mx-auto">
        <div className="flex flex-col w-6xl mx-auto justify-center text-center">
          <h1 className="mt-3 sm:mt-5 text-xl sm:text-4xl">
            What is the Air Quality Index?
          </h1>
          <h4 className="my-2 text-sm sm:text-md">
            The Air Quality Index (AQI) is the system used to warn the public
            when air pollution is dangerous by:
          </h4>
        </div>
        <div className="flex flex-row justify-center mt-4 gap-8 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col items-center">
            <IconContext.Provider value={{ size: 36 }}>
              <FaSmog />
            </IconContext.Provider>
            <p>Tracking Smog</p>
          </div>
          <div className="flex flex-col items-center">
            <IconContext.Provider value={{ size: 36 }}>
              <FaWind />
            </IconContext.Provider>
            <p>Monitoring Air Particles</p>
          </div>
          <div className="flex flex-col items-center">
            <IconContext.Provider value={{ size: 36 }}>
              <MdDangerous />
            </IconContext.Provider>
            <p>Indicating Risk Levels</p>
          </div>
        </div>
        <Table hoverable={true} className="mt-4 max-w-full overflow-x-auto">
          <Table.Head>
            <Table.HeadCell className="dark:text-lime-50">Name</Table.HeadCell>
            <Table.HeadCell className="dark:text-lime-50">
              Index Value
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-lime-50">
              Advisory
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell className="font-medium text-lime-900 dark:text-lime-50">
                Good
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 text-lime-900 ${getBackgroundColor(
                  0
                )}`}
              >
                0 to 50
              </Table.Cell>
              <Table.Cell className="text-lime-900 dark:text-lime-50">
                None
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium text-lime-950 dark:text-lime-50">
                Moderate
              </Table.Cell>
              <Table.Cell
                className={`text-lime-950 dark:text-lime-50 ${getBackgroundColor(
                  75
                )}`}
              >
                51 to 100
              </Table.Cell>
              <Table.Cell className="text-lime-950 dark:text-lime-50">
                Usually sensitive individuals should consider limiting prolonged
                outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium text-lime-950 dark:text-lime-50">
                Unhealthy for Sensitive Groups
              </Table.Cell>
              <Table.Cell
                className={`text-lime-950 dark:text-lime-50 ${getBackgroundColor(
                  125
                )}`}
              >
                101 to 150
              </Table.Cell>
              <Table.Cell className="text-lime-950 dark:text-lime-50">
                Children, active adults, and people with respiratory disease,
                such as asthma, should limit prolonged outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium text-lime-950 dark:text-lime-50">
                Unhealthy
              </Table.Cell>
              <Table.Cell
                className={`text-lime-950 dark:text-lime-50 ${getBackgroundColor(
                  175
                )}`}
              >
                151 to 200
              </Table.Cell>
              <Table.Cell className="text-lime-950 dark:text-lime-50">
                Children, active adults, and people with respiratory disease,
                such as asthma, should avoid outdoor exertion; everyone else
                should limit prolonged outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium text-lime-950 dark:text-lime-50">
                Very Unhealthy
              </Table.Cell>
              <Table.Cell
                className={`text-lime-950 dark:text-lime-50 ${getBackgroundColor(
                  250
                )}`}
              >
                201 to 300
              </Table.Cell>
              <Table.Cell className="text-lime-950 dark:text-lime-50">
                Children, active adults, and people with respiratory disease,
                such as asthma, should avoid outdoor exertion; everyone else
                should limit outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium text-lime-950 dark:text-lime-50">
                Hazardous
              </Table.Cell>
              <Table.Cell
                className={`text-lime-950 dark:text-lime-50 ${getBackgroundColor(
                  400
                )}`}
              >
                301 to 500
              </Table.Cell>
              <Table.Cell className="text-lime-950 dark:text-lime-50">
                Everyone should avoid all physical activity outdoors.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
          <div className="flex flex-col order-2 lg:order-1 justify-center items-center mx-auto p-4 sm:p-0">
            <h1 className="text-2xl sm:text-4xl font-bold my-3 sm:my-4">
              How Does It Work?
            </h1>
            <p className="text-justify sm:text-left">
              Daily measurements quantify air pollution levels, utilizing a
              scale from 0, indicating pristine air, to 500, signifying an
              imminent threat to public health. The Air Quality Index (AQI)
              categorizes pollution into six levels, each assigned a name, a
              corresponding color, and advisory recommendations. AQI values
              equal to or below 100 are deemed acceptable for nearly everyone.
              However, when surpassing 100, air quality is classified as
              unhealthy, with heightened values indicating an elevated risk of
              health issues for a larger population.
            </p>
          </div>
          <div className="flex flex-col order-1 lg:order-2 justify-center items-center">
            <img
              src="/aqi-pic.png"
              alt="How does it work image?"
              className="max-h-60 max-w-60 lg:max-w-80 lg:max-h-80"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-3 sm:p-0 mt-4">
          <div className="flex flex-col mx-auto justify-center text-center gap-4">
            <h1 className="text-2xl sm:text-4xl font-bold">
              Helpful Solutions
            </h1>
            <h2 className="text-lime-950 dark:text-lime-50 font-medium">
              Explore these effective solutions to improve air quality when it
              becomes unfavorable!
            </h2>
          </div>
          <div className="flex flex-wrap md:grid md:grid-cols-2 my-4 gap-4 md:gap-8 justify-center lg:justify-evenly">
            <div className="flex flex-col items-center justify-center ">
              <Card className="max-w-sm" horizontal>
                <TbAirConditioning fontSize="48px" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Purify Your Air!
                </h5>
                <p className="text-justify sm:text-left">
                  Purify your air and make it free from pollution! Purified air
                  means the air you breathe will be clean. Start from your
                  house!
                </p>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Card className="max-w-sm" horizontal>
                <TbFaceMask fontSize="48px" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Wear Face Masks!
                </h5>
                <p className="text-justify sm:text-left">
                  Make sure to wear face masks outside your house to protect
                  yourself from pollution! Inhaling pollutants can endanger your
                  life.
                </p>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Card className="max-w-sm" horizontal>
                <TbFilterCheck fontSize="48px" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Utilize Filters!
                </h5>
                <p className="text-justify sm:text-left">
                  Improve the air quality in your car by utilizing a filter. It
                  stops dirty air from going inside your cars.
                </p>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Card className="max-w-sm" horizontal>
                <TbWind fontSize="48px" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Monitor Air Quality!
                </h5>
                <p className="text-justify sm:text-left">
                  Monitor the air quality to make sure it is safe outside. But
                  never forget the other three solutions!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
    </>
  );
}
