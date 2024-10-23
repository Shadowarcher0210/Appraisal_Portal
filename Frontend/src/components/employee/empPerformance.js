import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const E_PerformancePage = () => {
  const [appraisalForms, setAppraisalForms] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [userData, setUserData] = useState(null);
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

  const fetchAppraisalDetails = async (selectedYear) => {
    console.log('Fetching data for year:', selectedYear);
    const userId = localStorage.getItem('userId');
    if (userId) {
      const startYear = parseInt(selectedYear.split('-')[0], 10);
      const endYear = startYear + 1;

      const startDate = new Date(`${startYear}-03-01`).toISOString().split('T')[0];
      const endDate = new Date(`${endYear}-04-30`).toISOString().split('T')[0];

      try {
        const response = await axios.get(`http://localhost:3003/time/getTime/${startDate}/${endDate}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const formattedUserData = response.data.map((item) => ({
          ...item,
          timePeriod: item.timePeriod.map((date) => date.split('T')[0]),
        }));

        setUserData(formattedUserData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    } else {
      console.log('User ID not found in local storage.');
    }
  };

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

  const handleViewClick = () => {
    console.log("Navigating to view");
    navigate('/view'); 
    handleCloseMenu(); // Close the dropdown after navigating
  };

  // Action Menu inside the main component
  const renderActionMenu = (index) => {
    return (
      <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
        <ul className="p-0 m-0">
          <li className="p-2 text-base cursor-pointer hover:bg-gray-200" onClick={handleViewClick}>
            View
          </li>
          <li
            className="p-2 text-base cursor-pointer hover:bg-gray-200"
            onClick={() => alert(`Download clicked for item`)}
          >
            Download
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 mt-16 overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto max-h-full">
          <label className="inline-block mb-4 p-2 bg-slate-100 rounded-lg">
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
          </label>

          <div className="bg-white rounded-lg shadow-md overflow-visible">
            <h2 className="text-2xl bg-blue-900 font-semibold p-4 text-white rounded-t-lg">Appraisals</h2>
            
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Employee name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Time Period
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Initiated On
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Manager name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 rounded-b-md">
                {userData && userData.length > 0 ? (
                  userData.map((appraisal, index) => (
                    <tr key={appraisal.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {employeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-center text-gray-900">
                        {appraisal.timePeriod &&
                        appraisal.timePeriod.length === 2
                          ? `${appraisal.timePeriod[0]} - ${appraisal.timePeriod[1]}`
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-center text-gray-900">
                        {appraisal.timePeriod[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-center text-gray-900">
                        {appraisal.managerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-center text-gray-900">
                        {appraisal.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-center text-blue-900 hover:text-blue-700 cursor-pointer">
                        <div className="relative" ref={menuRef}>
                          <button
                            className="text-xl font-bold focus:outline-none"
                            onClick={() => handleMenuClick(index)}
                          >
                            •••
                          </button>
                          {openMenuIndex === index && renderActionMenu(index)}
                        </div>
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
