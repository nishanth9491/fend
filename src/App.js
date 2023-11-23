import "./App.css";
// import Navbar from "./components/Navbar/navbar";

// import Today from "./components/Today/today";
// import Implement from "./components/Calendar/implement";
// import View from "./components/View/view";
import Signup from "./Login/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/" element={<Signup />} />
          <Route path="/home/:id/:taskId" element={<Home />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
