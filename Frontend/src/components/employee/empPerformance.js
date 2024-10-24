import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const E_PerformancePage = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [appraisals, setAppraisals] = useState(null);

  const employeeName = localStorage.getItem('empName');
  const navigate = useNavigate();
  const menuRef = useRef();


  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3;
    const years = [];

    for (let i = startYear; i <= currentYear; i++) {
      years.push(`${i}-${i + 1}`);
    }
    setAcademicYears(years);
    const defaultYear = currentYear - (new Date().getMonth() < 3 ? 1 : 0);
    setSelectedYear(`${defaultYear}-${defaultYear + 1}`);
  }, []);

  

  useEffect(() => {
    if (selectedYear) {
      fetchAppraisalDetails(selectedYear);
    }
  }, [selectedYear]);

  const handleMenuClick = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleCloseMenu = () => {
    setOpenMenuIndex(null);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    fetchAppraisalDetails(year);
  };


  const fetchAppraisalDetails = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3003/form/performance/${userId}`)
        setAppraisals(response.data);
        console.log('Fetched Appraisals in Performance Page :', response.data);
      } catch (error) {
        console.error('Error fetching appraisals in Performance page :', error)
      }
    }

  }
  useEffect(() => {
    fetchAppraisalDetails()
  }, []);

  const handleViewClick = (appraisal) => {
    console.log("Navigating to view");
    const { userId, timePeriod } = appraisal;
    navigate(`/empview?${userId}&${timePeriod[0]}&${timePeriod[1]}`);
    handleCloseMenu(); 
  };
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  // Action Menu inside the main component
  // const renderActionMenu = (index) => {
  //   return (
  //     <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
  //       <ul className="p-0 m-0">
  //         <li className="p-2 text-base cursor-pointer hover:bg-gray-200" onClick={handleViewClick(appraisal)}>
  //           View
  //         </li>
  //         <li
  //           className="p-2 text-base cursor-pointer hover:bg-gray-200"
  //           onClick={() => alert(`Download clicked for item`)}
  //         >
  //           Download
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // };

  return (
    <div className="flex h-screen ml-6 mt-20 overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto max-h-full">
          {/* <label className="inline-block mb-4 p-2 bg-slate-100 rounded-lg">
            <span htmlFor="time-period">Time Period:</span>
            <select
              id="time-period"
              value={selectedYear}
              className="ml-2 p-1 bg-gray-100 rounded-lg"
              onChange={handleYearChange}
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label> */}

<div className="w-12/12 p-4 bg-white border shadow-md rounded-md ml-4 mr-8">
<h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisal</h2>
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-00 uppercase tracking-wider">Employee name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Assessment Year</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Initiated On</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Manager name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {appraisals && appraisals.length > 0 ? (
        appraisals.map((appraisal, index) => (
          <tr key={appraisal.userId} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap font-medium text-sm  text-gray-500">
              {employeeName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {formatDate(appraisal.timePeriod[0])} to {formatDate(appraisal.timePeriod[1])}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{formatDate(appraisal.timePeriod[0])}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium  text-gray-500">
              {appraisal.managerName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-sm  text-gray-500">
              {appraisal.status}
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-sm  text-blue-900 hover:text-blue-700 cursor-pointer">
            <button className='bg-blue-500 text-white hover:bg-blue-600 rounded-md px-2 py-2 w-16' onClick={() => handleViewClick(appraisal)}>View</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="px-6 py-4 text-center text-gray-900">
            No appraisals found for this user.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

        </div>

      </div>
    </div>
  );
};

export default E_PerformancePage;