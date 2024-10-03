import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homelandingpage from './components/Homelanding.js';
import Viewallappraisals from './components/Viewallappraisals.js';
import EmployeeDataManagement from './components/EmployeeDataManagement.js';
import ConfigureAppraisalForms from './components/ConfigureAppraisalForms.js';  // Import new component
import Header from './components/Header';
import Leftnavbar from './components/Leftnavbar';
import Login from './components/Login.js';

const App = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
    <div className="flex">
     
      {!isLoginPage && <Leftnavbar />}
      <div className="flex-grow">
      
        {!isLoginPage && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Homelandingpage />} />
          <Route path="/viewallappraisals" element={<Viewallappraisals />} />
          <Route path="/employee-data-management" element={<EmployeeDataManagement />} />
          <Route path="/configure-appraisal-forms" element={<ConfigureAppraisalForms />} />  {/* New route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;

