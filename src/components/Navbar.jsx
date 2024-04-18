import { Button, Navbar } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function MyNavbar() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <Navbar
      fluid
      rounded
      className="bg-neutral-100 w-screen mx-auto pt-6 border-b-2 dark:bg-slate-600 fixed z-20"
    >
      <Navbar.Brand as={Link} to="/">
        <span className="sm:text-2xl self-center whitespace-nowrap text-xl font-semibold text-lime-700 hover:text-lime-900 dark:text-lime-500 dark:hover:text-lime-200">
          MetroBreathe
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/about"
          className="text-lime-950 dark:text-lime-50"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/predictions"
          className="text-lime-950 dark:text-lime-50"
        >
          Forecast
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/monitoring"
          className="text-lime-950 dark:text-lime-50"
        >
          Monitoring
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/quality"
          className="text-lime-950 dark:text-lime-50"
        >
          What is AQI?
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/contact"
          className="text-lime-950 dark:text-lime-50"
        >
          Contact
        </Navbar.Link>
        <div className="md:pr-4">
          <Button
            className="w-12 h-10 mt-3 sm:mt-0"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
