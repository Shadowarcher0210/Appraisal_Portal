
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../hrManager/Modal';
import axios from 'axios';


const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [date] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const employeeName = localStorage.getItem('empName');
  const navigate = useNavigate();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const appraisalStartDate = new Date(`${currentYear - 1}-03-01`).toLocaleDateString();
  const appraisalEndDate = new Date(`${currentYear}-03-31`).toLocaleDateString();
  const appraisalDueDate = new Date(`${currentYear}-03-15`);
  const appraisalVisibleStart = new Date(`${currentYear}-03-01`);

  const goalSettingStartDate = new Date(`${currentYear}-05-01`).toLocaleDateString();
  const goalSettingEndDate = new Date(`${currentYear + 1}-03-31`).toLocaleDateString();
  const goalSettingDueDate = new Date(`${currentYear + 1}-03-15`);
  const goalSettingVisibleStart = new Date(`${currentYear + 1}-03-01`);

  const fetchAppraisalDetails = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3003/form/display/${userId}`);
        const currentYear = new Date().getFullYear();
        const sortedData = response.data
          .filter(appraisal => {
            const startYear = parseInt(appraisal.timePeriod[0]);
            return startYear >= currentYear && startYear <= currentYear + 1;
          })
          .sort((a, b) => {
            const startYearA = parseInt(a.timePeriod[0]);
            const startYearB = parseInt(b.timePeriod[0]);
            return startYearA - startYearB;
          });

        setUserData(sortedData);
        console.log("userdata", sortedData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    } else {
      console.log('User ID not found in local storage.');
    }
  };

  useEffect(() => {
    fetchAppraisalDetails();
  }, []);

  const wishing = () => {
    const hour = date.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toUpperCase();
  };


  const handleMenuClick = () => {
    // setOpenMenuIndex(openMenuIndex === index ? null : index);
    navigate('/Form')
  };

  const closeMenu = () => {
    setOpenMenuIndex(null);
  };

  return (
    <div className="justify-center items-start mt-20 ml-8">
      <div>
        <label className='font-bold text-4xl w-full ml-4 mb-4'>{wishing()}</label>
        <label className='ml-2 text-3xl font-bold text-orange-600'>
          {employeeName}
        </label>

        <p className='ml-5 mt-3'>{formatDate(date)} <span> , </span>{formatTime(date)}</p>
      </div>
      <br />

      <div className="bg-white rounded-lg shadow-md overflow-visible w-11/12 ml-4">
        <h2 className="text-2xl bg-blue-900 font-semibold p-4 text-white rounded-t-lg">Appraisal</h2>
        <table className="min-w-full rounded-lg">
          <thead className="bg-gray-200 rounded-t-lg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Employee name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Assessment Year</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Initiated On</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Manager name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <button className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</button>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg">
            {userData ? (
              userData.map((appraisal, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-900">{appraisal.empName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900">
                    {appraisal.timePeriod[0]} - {appraisal.timePeriod[1]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900">{appraisal.initiatedOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900">{appraisal.managerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-900">{appraisal.status}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-900 hover:text-blue-700 cursor-pointer">
                    <ActionMenu
                      isOpen={openMenuIndex === index}
                      onClick={() => handleMenuClick(index)}
                      index={index}
                      closeMenu={closeMenu}
                    />
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 text-center">

                  <div className=" justify-center ">
  <button 
    className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-2 py-1"
    onClick={() => handleMenuClick(index)}
  >
    Edit
  </button>
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
        {/* <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        /> */}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden ml-4 w-4/6 mt-8">
        <h2 className="text-2xl bg-blue-900 font-semibold p-4 text-white mb-2">Important Dates</h2>
        {currentDate >= appraisalVisibleStart && currentDate <= appraisalDueDate ? (
          <p className="text-md mb-2">
            <span className="font-medium text-gray-700">Please complete your appraisal before: </span>
            <span className="underline">{appraisalDueDate.toLocaleDateString()}</span>
          </p>
        ) : (
          <p className="text-md mb-2">
            <span className="font-medium p-2 text-gray-600 inline-block w-40">Appraisal Cycle:</span>
            <span className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{appraisalStartDate} to {appraisalEndDate}</span>
          </p>
        )}

        {currentDate >= goalSettingVisibleStart && currentDate <= goalSettingDueDate ? (
          <p className="text-md mb-2">
            <span className="font-medium p-2 text-gray-700">Please complete your goal setting before: </span>
            <span className="underline">{goalSettingDueDate.toLocaleDateString()}</span>
          </p>
        ) : (
          <p className="text-md mb-2">
            <span className="font-medium p-2 text-gray-600 inline-block w-40">Goal Setting:</span>
            <span className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{goalSettingStartDate} to {goalSettingEndDate}</span>
          </p>
        )}

        <p className="mt-6 text-sm p-2">
          Ensure your goals for the upcoming year are set during the designated period to align with organizational objectives.
        </p>
      </div>
    </div>
  );
};

export default Dashboard  ;