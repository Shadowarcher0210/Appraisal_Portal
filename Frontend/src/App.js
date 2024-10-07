import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homelandingpage from './components/hrManager/Homelanding.js';
import Viewallappraisals from './components/Viewallappraisals.js';
import EmployeeDataManagement from './components/employee/empDataManagement.js';
import ConfigureAppraisalForms from './components/hrManager/ConfigureAppraisalForms.js'; 
import Header from './components/Header.js';
import Leftnavbar from './components/Leftnavbar.js';
import PerformancePage from './components/employee/empPerformance.js';
import Login from './components/Login.js';
import empDashboard from './components/employee/empDashboard.js';
import empDataManagement from './components/employee/empDataManagement.js';
import empPerformance from './components/employee/empPerformance.js';
import Profile from './components/Profile.js';
import empView from './components/employee/empView.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';

const App = () => {
  const location = useLocation();
  return (
    <div className="flex">
      {location.pathname !=="/" && <Leftnavbar />}
      <div className="flex-grow">
        {location.pathname !== "/" &&<Header />}
        
        <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/profile' element={<Profile/>}/> 
         <Route path='/forgotpassword' element={<ForgotPassword/>}/> 
         <Route path='/resetPassword/:id/:token' element={<ResetPassword/>}/> 
          <Route path="/home" element={<Homelandingpage />} />
          <Route path="/viewallappraisals" element={<Viewallappraisals />} />
          <Route path="/empdata" element={<EmployeeDataManagement />} />
          <Route path = "/performance" element={<PerformancePage/>}/>
          <Route path="/configure-appraisal-forms" element={<ConfigureAppraisalForms />} /> 
           <Route path="/view" element={<empView/>}/>
          <Route path="/employee-dashboard" element={<empDashboard/>}/>
          <Route path="/employee-edm" element={<empDataManagement/>}/>
          <Route path="/employee-performance" element={<empPerformance/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
