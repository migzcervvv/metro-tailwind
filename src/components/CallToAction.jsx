import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl dark:text-lime-50">
          Dive Deeper into AQI for Your Health's Sake!
        </h2>
        <p className="my-2 text-justify">
          Explore AQI to understand its impact on your well-being. Discover
          essential strategies to protect yourself and your loved ones. Take
          charge of your health by delving into AQI today!
        </p>
        <Link to="/quality">
          <Button
            gradientDuoTone="purpleToBlue"
            className="rounded-tl-xl rounded-bl-none w-full"
          >
            Learn More!
          </Button>
        </Link>
      </div>
      <div className="p-7 flex-1">
        <img src="/clean-city.jpg" alt="CTA image" className="rounded-xl" />
      </div>
    </div>
  );
}
