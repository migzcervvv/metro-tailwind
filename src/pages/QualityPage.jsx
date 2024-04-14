import MyFooter from "../components/Footer";
import { FaSmog, FaWind } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { IconContext } from "react-icons";
import { Table } from "flowbite-react";

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
        <div className="flex flex-row justify-center mt-4 gap-4 flex-wrap sm:flex-nowrap">
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
              <Table.Cell className="font-medium dark:text-lime-50">
                Good
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 ${getBackgroundColor(0)}`}
              >
                0 to 50
              </Table.Cell>
              <Table.Cell className="dark:text-lime-50">None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium dark:text-lime-50">
                Moderate
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 ${getBackgroundColor(75)}`}
              >
                51 to 100
              </Table.Cell>
              <Table.Cell className="dark:text-lime-50">
                Usually sensitive individuals should consider limiting prolonged
                outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium dark:text-lime-50">
                Unhealthy for Sensitive Groups
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 ${getBackgroundColor(125)}`}
              >
                101 to 150
              </Table.Cell>
              <Table.Cell className="dark:text-lime-50">
                Children, active adults, and people with respiratory disease,
                such as asthma, should limit prolonged outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium dark:text-lime-50">
                Unhealthy
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 ${getBackgroundColor(175)}`}
              >
                151 to 200
              </Table.Cell>
              <Table.Cell className="dark:text-lime-50">
                Children, active adults, and people with respiratory disease,
                such as asthma, should avoid outdoor exertion; everyone else
                should limit prolonged outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium dark:text-lime-50">
                Very Unhealthy
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 ${getBackgroundColor(250)}`}
              >
                201 to 300
              </Table.Cell>
              <Table.Cell className="dark:text-lime-50">
                Children, active adults, and people with respiratory disease,
                such as asthma, should avoid outdoor exertion; everyone else
                should limit outdoor exertion.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-medium dark:text-lime-50">
                Hazardous
              </Table.Cell>
              <Table.Cell
                className={`dark:text-lime-50 ${getBackgroundColor(400)}`}
              >
                301 to 500
              </Table.Cell>
              <Table.Cell className="dark:text-lime-50">
                Everyone should avoid all physical activity outdoors.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <MyFooter />
    </>
  );
}
