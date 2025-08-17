import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import DisplayFoodTruck from "./components/DisplayFoodTruck";
import ApplyForm from "./components/ApplyForm";
import Footer from "./components/Footer";
import RenderComp from "./RenderComp";
  
function App() {  
  return (
    <Router>
      <MainContent />
    </Router>
  );   
}

function MainContent() {
  const location = useLocation();
  const showFullLayout = location.pathname !== "/app";

  return (
    <div className="App">
      {showFullLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/getAllVendors" element={<DisplayFoodTruck />} />
        <Route path="/app" element={<RenderComp />} />
      </Routes>
      {showFullLayout && <Footer />}
    </div>
  );
}

export default App;
