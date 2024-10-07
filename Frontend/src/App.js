import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homelandingpage from './components/Homelanding.js';
import Viewallappraisals from './components/Viewallappraisals.js';
import EmployeeDataManagement from './components/EmployeeDataManagement.js';
import ConfigureAppraisalForms from './components/ConfigureAppraisalForms.js';  
import Header from './components/Header';
import Leftnavbar from './components/Leftnavbar';
import Login from './components/Login.js';
import ForgotPassword from './components/ForgotPassword.js';

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Return true if token exists
};

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');  
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Leftnavbar />
      <div className="flex-grow">
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Homelandingpage />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/viewallappraisals" element={<Viewallappraisals />} />
          <Route path="/employee-data-management" element={<EmployeeDataManagement />} />
          <Route path="/configure-appraisal-forms" element={<ConfigureAppraisalForms />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
