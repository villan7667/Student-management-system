import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AddStudent from "./components/AddStudent";
import ViewStudents from "./components/ViewStudents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/view" element={<ViewStudents />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
