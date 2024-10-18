
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios

const applications = [
  { id: 1, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Chandra Mouli', status: 'initiated' },
  { id: 2, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Tejaswi', createdDate: '2023-01-30' },
  { id: 3, timePeriod: '01/04/2024 to 31/03/2025', manager: 'sudhakar', createdDate: '2023-04-10' },
  { id: 4, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Tyson', createdDate: '2024-02-20' },
  { id: 5, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Kiran', createdDate: '2024-04-05' },
];

// const getAcademicYearRange = (year) => {
//   const start = new Date(year, 3, 1);
//   const end = new Date(year + 1, 2, 31, 23, 59, 59, 999);
//   return { start, end };
// };

const ActionMenu = ({ isOpen, onClick, index }) => {
  return (
    <div className="relative">
      <button className="text-xl font-bold focus:outline-none" onClick={onClick}>
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
          <ul className="list-none p-0 m-0">
            <li className="p-2 text-base cursor-pointer hover:bg-gray-200" onClick={() => alert(`View clicked for item ${index}`)}>
              View
            </li>
            <li className="p-2 text-base cursor-pointer hover:bg-gray-200" onClick={() => alert(`Download clicked for item ${index}`)}>
              Download
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const E_PerformancePage = () => {
  
  const [appraisalForms , setAppraisalForms] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [file, setFile] = useState(null); 
  // const [loading, setLoading] = useState(false);
  // const [uploadStatus, setUploadStatus] = useState(null); 
  const [userData, setUserData] = useState(null);
  const employeeName = localStorage.getItem('empName');

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

  // const handleMenuClick = (index) => {
  //   setOpenMenuIndex(openMenuIndex === index ? null : index);
  // };

  // useEffect(() => {
  //   if (selectedYear) {
  //     const startYear = parseInt(selectedYear.split('-')[0], 10);
  //     const { start, end } = getAcademicYearRange(startYear);
  //     const filtered = applications.filter((app) => {
  //       const appDate = new Date(app.createdDate);
  //       return appDate >= start && appDate <= end;
  //     });

  //     setFilteredApps(filtered);
  //   }
  // }, [selectedYear]);


  const fetchAppraisalDetails = async (selectedYear) => {
    console.log("Fetching data for year:", selectedYear);
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
        const formattedUserData = response.data.map(item => ({
          ...item,
          timePeriod: item.timePeriod.map(date => date.split('T')[0]),
      }));

      setUserData(formattedUserData);
      
      console.log("userdata", formattedUserData);  
      console.log("userdata", userData);
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

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    fetchAppraisalDetails(year); 
    console.log("Selected Year:", e.target.value);
  };
  
  return (
    <div className='justify-center items-start mt-20 ml-28'>
      <div>
        <div>
        <label className='ml-6 pl-4 rounded-lg py-1 p-1 bg-slate-100'>
          <span htmlFor="time-period">Time Period:</span> 
          <select
            id="time-period"
            value={selectedYear}
            className='p-1 mb-10 bg-gray-100 rounded-lg'
            onChange={handleYearChange}
          >
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
          <br />
     
   <div className="w-11/12 p-4 bg-white border shadow-md rounded-md ml-4 mr-8">
      <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Initiated On</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userData && userData.length > 0 ? (
            userData.map((appraisal, index) => (
              <tr key={appraisal.userId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                {appraisal.timePeriod && appraisal.timePeriod.length === 2
                  ? `${appraisal.timePeriod[0]} - ${appraisal.timePeriod[1]}` : 'N/A'}      
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.timePeriod[0]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.managerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer">
                  <ActionMenu
                    isOpen={openMenuIndex === index}
                    onClick={() => handleMenuClick(index)}
                    index={index}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                No appraisals found for this user.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
        <br />
        <br />
      </div>
    </div>
    </div>
  );
};

export default E_PerformancePage;
