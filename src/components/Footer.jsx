import { Footer, Modal } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import PDFViewer from "./Pdfview";
import { useState } from "react";

export default function MyFooter() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePdfLinkClick = (type) => {
    console.log("Link clicked:", type);
    if (type === "privacy") {
      setPdfUrl("/policy.pdf");
    } else if (type === "terms") {
      setPdfUrl("/terms.pdf");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setPdfUrl("");
    setIsModalOpen(false);
  };

  return (
    <Footer
      container
      className="bg-neutral-100 mx-auto border-t-2 dark:bg-slate-600"
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="mb-3 sm:my-0 ">
            <a
              href="/"
              className="sm:text-2xl self-center whitespace-nowrap text-xl font-semibold text-lime-700 hover:text-lime-900 dark:text-lime-500 dark:hover:text-lime-200"
            >
              MetroBreathe
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link as={Link} to="/about">
                  About Us
                </Footer.Link>
                <Footer.Link as={Link} to="/quality">
                  What is AQI?
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Services" />
              <Footer.LinkGroup col>
                <Footer.Link as={Link} to="/monitoring">
                  Air Monitoring
                </Footer.Link>
                <Footer.Link as={Link} to="/predictions">
                  Forecasting
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                {/* Add onClick handlers to open the modal */}
                <Footer.Link
                  onClick={() => handlePdfLinkClick("privacy")}
                  style={{ cursor: "pointer" }}
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  onClick={() => handlePdfLinkClick("terms")}
                  style={{ cursor: "pointer" }}
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="/"
            by="MetroBreathe"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="https://github.com/migzcervvv/metro-tailwind"
              target="_blank"
              referrerPolicy="noopener"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Pass PDF URL and onClose function to PDFViewer */}
        <PDFViewer pdfUrl={pdfUrl} onClose={closeModal} />
      </Modal>
    </Footer>
  );
}
