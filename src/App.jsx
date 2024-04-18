import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";
import MyNavbar from "./components/Navbar";
import Predictions from "./pages/Predictions";
import MonitoringPage from "./pages/MonitoringPage";
import QualityPage from "./pages/QualityPage";
import ContactPage from "./pages/ContactPage";
import MyComponent from "./pages/MyComponent";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/predictions" element={<Predictions />}></Route>
        <Route path="/monitoring" element={<MonitoringPage />}></Route>
        <Route path="/quality" element={<QualityPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/test" element={<MyComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
