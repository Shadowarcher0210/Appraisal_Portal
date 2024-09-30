import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homelandingpage from './components/Homelanding.js';
import Viewallappraisals from './components/Viewallappraisals.js';
import EmployeeDataManagement from './components/EmployeeDataManagement.js';
import ConfigureAppraisalForms from './components/ConfigureAppraisalForms.js';  // Import new component
import Header from './components/Header';
import Leftnavbar from './components/Leftnavbar';

const App = () => {
  return (
    <div className="flex">
      <Leftnavbar />
      <div className="flex-grow">
        <Header />
        <Routes>
          <Route path="/" element={<Homelandingpage />} />
          <Route path="/viewallappraisals" element={<Viewallappraisals />} />
          <Route path="/employee-data-management" element={<EmployeeDataManagement />} />
          <Route path="/configure-appraisal-forms" element={<ConfigureAppraisalForms />} />  {/* New route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
