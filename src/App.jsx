// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar component
import SignUp from "./components/SignUp"; // Import SignUp component
import Home from "./components/Home"; // Import Home component
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";

import './App.css'
import EmployeeAccess from "./components/EmployeeAccess";
import EmployerAccess from "./components/EmployerAccess";


function App() {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/employer-dashboard" element={<EmployerAccess />}  />
        <Route path="/employee-dashboard" element={<EmployeeAccess />} />
      </Routes>
    
    
    </>
     
  );
}

export default App;
