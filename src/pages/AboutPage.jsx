import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import MyFooter from "../components/Footer";
import CallToAction from "../components/CallToAction";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen mx-auto pt-24">
        <div className="h-40">
          <div className="flex justify-center mx-auto">
            <h1 className="text-2xl sm:text-4xl">About Us</h1>
          </div>
          <div className="flex justify-center pt-3 mx-auto w-4/5">
            <p className="text-justify sm:text-left">
              MetroBreathe strives to provide an informative website designed to
              enhance people's understanding of the significance of the Air
              Quality Index (AQI).
            </p>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col mx-auto">
          <div className="flex flex-col justify-center sm:w-8/12 order-last sm:order-first">
            <div className="px-3 sm:pl-5 text-2xl sm:text-4xl">
              <h1>Understanding the urgency</h1>
            </div>
            <div className="px-3 sm:pl-5 pt-2">
              <p className="text-justify sm:text-left">
                In 2022, the Philippines faced challenges in air quality,
                ranking 69th among the world's most polluted regions. The PM2.5
                levels, a measure of tiny particles harmful to health, were
                three times higher than the safety standards set by the World
                Health Organization.
              </p>
              <p className="text-justify sm:text-left">
                To address this issue, we propose implementing a smart air
                pollution monitoring system and a smog prediction model. This
                initiative aims to enhance air quality in Quezon City promoting
                a healthier environment for all.
              </p>
              <div className="flex justify-center sm:justify-start my-4">
                <Link to="/predictions">
                  <Button pill outline gradientDuoTone="purpleToBlue">
                    Check Predictions!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/6 pr-5 mx-auto order-first sm:order-last flex justify-center">
            <img
              src="/manila.jpg"
              className="my-5 sm:my-0 rounded-2xl h-36 w-1/2 sm:h-auto sm:w-auto"
            />
          </div>{" "}
        </div>
        <div className="max-w-6xl mx-auto mt-4 flex flex-col sm:flex-row w-3/4">
          <div className="flex justify-center flex-col mx-auto">
            <h1 className="text-2xl sm:text-4xl">Meet the team</h1>
            <p className="text-justify sm:text-left">
              Our team consists of Computer Engineering Students from Pamantasan
              ng Lungsod ng Maynila.
            </p>
          </div>
          <div className="sm:w-2/3 w-full mx-auto my-3">
            <Card className="max-w-sm shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Our Team
                </h5>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt="JC Castro"
                          height="32"
                          src="/team/jc.jpg"
                          width="32"
                          className="rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          JC Castro
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          Researcher
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <a
                          href="https://www.facebook.com/Kesong.pulaa14"
                          target="_blank"
                          referrerPolicy="noopener"
                        >
                          <BiLogoFacebookCircle className="icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt="Miggz Cervantes"
                          height="32"
                          src="/team/miggz.jpg"
                          width="32"
                          className="rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Miggz Cervantes
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          Web Developer
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <a
                          href="https://www.facebook.com/migzcerv7/"
                          target="_blank"
                          referrerPolicy="noopener"
                        >
                          <BiLogoFacebookCircle className="icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt="Eiann Lapid"
                          height="32"
                          src="/team/lapid.jpg"
                          width="32"
                          className="rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Eiann Lapid
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          Hardware Developer
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <a
                          href="https://www.facebook.com/lapidhec"
                          target="_blank"
                          referrerPolicy="noopener"
                        >
                          <BiLogoFacebookCircle className="icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt="Danielle Martino"
                          height="32"
                          src="/team/danielle.jpg"
                          width="32"
                          className="rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Danielle Martino
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          Hardware Developer
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <a
                          href="https://www.facebook.com/danemartino"
                          target="_blank"
                          referrerPolicy="noopener"
                        >
                          <BiLogoFacebookCircle className="icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="pb-0 pt-3 sm:pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt="Angelo Sumang"
                          height="32"
                          src="/team/sumang.jpg"
                          width="32"
                          className="rounded-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Angelo Sumang
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          Researcher
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <a
                          href="https://www.facebook.com/johnangelo.sumang.04"
                          target="_blank"
                          referrerPolicy="noopener"
                        >
                          <BiLogoFacebookCircle className="icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <CallToAction />
      <MyFooter />
    </>
  );
}
