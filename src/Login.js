import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Login/Signup";

const Login = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Login;
