import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homelandingpage from './components/hrManager/Homelanding.js';
import Viewallappraisals from './components/Viewallappraisals.js';
import EmployeeDataManagement from './components/hrManager/EmployeeDataManagement.js';
import ConfigureAppraisalForms from './components/hrManager/ConfigureAppraisalForms.js';  // Import new component
import Header from './components/Header.js';
import Leftnavbar from './components/Leftnavbar.js';
import PerformancePage from './components/hrManager/PerformancePage.js';
import Login from './components/Login.js';
import E_Dashboard from './components/employee/E_Dashboard.js';
import E_EmployeeDataManagement from './components/employee/E_EmployeeDataManagement.js';
import E_PerformancePage from './components/employee/E_Performance.js';
import Profile from './components/Profile.js';
import E_View from './components/employee/E_View.js';

const App = () => {
  const location = useLocation();
  return (
    <div className="flex">
      {location.pathname !="/" && <Leftnavbar />}
      <div className="flex-grow">
        {location.pathname != "/" &&<Header />}
        
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/> 
          <Route path="/home-page" element={<Homelandingpage />} />
          <Route path="/viewallappraisals" element={<Viewallappraisals />} />
          <Route path="/employee-data-management" element={<EmployeeDataManagement />} />
          <Route path = "/performance-page" element={<PerformancePage/>}/>
          <Route path="/configure-appraisal-forms" element={<ConfigureAppraisalForms />} />  {/* New route */}
<Route path="/view" element={<E_View/>}/>
          <Route path='employee-dashboard' element={<E_Dashboard/>}/>
          <Route path='employee-edm' element={<E_EmployeeDataManagement/>}/>
          <Route path='employee-performance' element={<E_PerformancePage/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;

