import { HiMail } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import MyFooter from "../components/Footer";
import Map from "../components/Map";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://metro.pythonanywhere.com/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setSubmitStatus({ success: true, message: responseData.message });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Submit Error:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to submit form. Error: " + error.message,
      });
    }
  };

  const sendEmail = () => {
    const recipientEmail = import.meta.env.VITE_METRO_EMAIL;
    const subject = "Subject";
    const body = "Body";

    // Constructing the mailto URL
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Opening the default email client
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between pt-0 p-4 md:p-4">
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
            <Button
              gradientMonochrome="info"
              pill
              className="w-full"
              onClick={sendEmail}
            >
              <HiMail fontSize="24px" />
            </Button>
          </div>
          {submitStatus && (
            <Alert variant={submitStatus.success ? "success" : "danger"}>
              {submitStatus.message}
            </Alert>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
                className="form-input w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email address"
                required
                className="form-input w-full"
              />
            </div>
            <div>
              <label htmlFor="text" className="block mb-2">
                Text
              </label>
              <textarea
                name="message"
                rows="8"
                value={formData.message}
                onChange={handleChange}
                placeholder="Send a message!"
                required
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
