import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; // Ensure this link is correct and working

const PrivacyPolicyPDF = () => {
  const [index, setIndex] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null); // For tracking the number of pages in the PDF

  return (
    <div>
      <Document file="policy.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

const TermsAndConditionsPDF = () => {
  const [index, setIndex] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null); // For tracking the number of pages in the PDF

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <Document
        className="document"
        file={selectedPdf}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page className="pdf-page" key={index} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};

const Modal = ({ closeModal, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <button onClick={closeModal} className="absolute top-0 right-0 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 19a9 9 0 100-18 9 9 0 000 18zm-8-9a8 8 0 1116 0 8 8 0 01-16 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M14.95 5.636a1 1 0 10-1.414-1.414L10 8.586 6.464 5.05a1 1 0 10-1.414 1.414L8.586 10l-3.535 3.536a1 1 0 101.414 1.414L10 11.414l3.536 3.535a1 1 0 001.414-1.414L11.414 10l3.536-3.536z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const PDFViewerModal = ({ closeModal, pdfType }) => {
  let content;
  if (pdfType === "privacy") {
    content = <PrivacyPolicyPDF />;
  } else if (pdfType === "terms") {
    content = <TermsAndConditionsPDF />;
  }

  return <Modal closeModal={closeModal}>{content}</Modal>;
};

const PDFViewerPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [pdfType, setPdfType] = useState(null);


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleOpenPdf = (pdfLink) => {
    console.log("Opening PDF:", pdfLink); // Log the PDF link before attempting to open
    setSelectedPdf(pdfLink);
    setShowPdfViewer(true);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
    setShowPdfViewer(false);
    setNumPages(null); // Reset page count when closing the PDF viewer
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("PDF loaded successfully. Number of pages:", numPages); // Log the number of pages loaded
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error); // Log any errors encountered while loading the PDF
  };

  return (
    <div>
      <button onClick={() => openModal("privacy")} className="text-blue-500">
        Privacy Policy
      </button>
      <button onClick={() => openModal("terms")} className="text-blue-500">
        Terms and Conditions
      </button>

      {showModal && (
        <PDFViewerModal closeModal={closeModal} pdfType={pdfType} />
      )}
    </div>
  );
};

export default PDFViewerPage;
