import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center overflow-hidden">
      <div className="min-h-full w-4/5 flex flex-col justify-center gap-3 order-last sm:order-first mx-auto">
        <h1 className="sm:text-6xl text-4xl font-semibold pl-3">
          Breathing Life Into Metro Manila's Air Quality
        </h1>
        <h4 className="sm:text-lg text-md font-medium pl-3">
          Empowering Metro Manila with Smog-Free Tomorrows through Advanced Air
          Quality Predictions.
        </h4>
        <Button
          as={Link}
          pill
          outline
          gradientDuoTone="purpleToBlue"
          to="/about"
          className="w-full md:w-1/3"
        >
          Learn More
        </Button>
      </div>
      <div className="flex min-h-full w-3/6 justify-center flex-col mx-auto">
        <img src="metro.png" className="h-72 w-72 sm:h-auto sm:w-auto" />
      </div>
    </div>
  );
}
