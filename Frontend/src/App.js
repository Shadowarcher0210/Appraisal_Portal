import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homelandingpage from './components/Homelanding.js';
import Viewallappraisals from './components/Viewallappraisals.js';
import EmployeeDataManagement from './components/EmployeeDataManagement.js';
import ConfigureAppraisalForms from './components/ConfigureAppraisalForms.js';  // Import new component
import Header from './components/Header';
import Leftnavbar from './components/Leftnavbar';
import Login from './components/Login.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';

const App = () => {
  const location = useLocation();

   const isAuthPage = location.pathname === '/' || location.pathname === '/forgotpassword' || location.pathname === '/resetpassword';

  return (
    <div className="flex">
      {!isAuthPage && <Leftnavbar />}
      <div className="flex-grow">
        {!isAuthPage && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element ={<ForgotPassword/>}/>
          <Route path="/resetpassword/:id/:token" element ={<ResetPassword/>}/>
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

