import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Resume from "./Components/Resume/Resume.jsx";
import Portfolio from "./Components/Portfolio/Portfolio.jsx";
import Services from "./Components/Services/Services.jsx";
import Contact from "./Components/Contact/Contact.jsx";

const MainLayout = () => (
  <div>
    <Sidebar />
    <Home />
    <About />
    <Resume />
    <Portfolio />
    <Services />
    <Contact />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<MainLayout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
