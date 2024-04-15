import { HiMail } from "react-icons/hi";
import { Button } from "flowbite-react";
import MyFooter from "../components/Footer";
import Map from "../components/Map";

const ContactForm = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between p-4">
        <div className="flex flex-col justify-center p-2 mb-4 md:mb-0 md:w-1/2">
          <img
            src="/metro.png"
            alt="metrobreathe hero logo"
            className="hidden lg:inline"
          />
        </div>
        <div className="">
          <div className="flex flex-col justify-center p-2 mb-4 md:mb-0">
            <h1 className="text-xl font-bold mb-2">CONTACT US</h1>
            <p>
              If you have any questions about us, feel free to ask! We are
              always happy to help!
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <Button gradientMonochrome="info" pill className="w-full">
              <HiMail fontSize="24px" />
            </Button>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input type="text" name="name" className="form-input w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input type="email" name="email" className="form-input w-full" />
            </div>
            <div>
              <label htmlFor="text" className="block mb-2">
                Text
              </label>
              <textarea
                name="text"
                rows="8"
                className="form-textarea w-full"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <Button
                outline
                gradientDuoTone="cyanToBlue"
                className="min-w-full"
                type="submit"
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Map />
      <MyFooter />
    </>
  );
};

export default ContactForm;
