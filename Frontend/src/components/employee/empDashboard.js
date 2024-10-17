import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../hrManager/Modal';
import axios from 'axios';

const ActionMenu = ({ isOpen, onClick, index }) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <button
        className="text-xl ml-8 font-bold focus:outline-none"
        onClick={onClick}
      >
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
          <ul className="list-none p-0 m-0">
            <li
              className="p-2 text-base cursor-pointer hover:bg-gray-200"
              onClick={() => navigate('/view')}
            >
              Edit
            </li>
            <li
              className="p-2 text-base cursor-pointer hover:bg-gray-200"
              onClick={() => alert(`Download clicked for item ${index}`)}
            >
              Download
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [date]=useState(new Date());
  // const [view , setView] = useState();
  const [userData, setUserData] = useState(null);
  const employeeName = localStorage.getItem('empName');
  
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

  const navigate = useNavigate();

  const fetchAppraisalDetails = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3003/form/display/${userId}`);
        setUserData(response.data);
        console.log("userdata",userData)
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

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMenuClick = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="justify-center items-start mt-20 ml-28">
      <div>
      <label className='font-bold text-4xl w-full ml-2 mb-4'>{wishing()}</label>
            <label className='ml-2 text-3xl font-bold text-orange-600'>
              {employeeName} 
            </label>
 
         <p className='ml-2 mt-3'>{formatDate(date)} <span> , </span>{formatTime(date)}</p>

      </div>
      <br />
      
      <div className="w-11/12 p-4 bg-white border shadow-md rounded-md ml-4 mr-8">
        <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee name</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Band</th> */}

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Assessment Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Initiated On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {userData ? (
               userData.map((appraisal, index) => (
               <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.empName}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.band}</td> */}

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {appraisal.timePeriod[0]} - {appraisal.timePeriod[1]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.initiatedOn}</td>
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
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

      </div>

      <div className="mt-8 ml-4 w-3/5 p-4 bg-white border shadow-md rounded-md ">
            <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Important Dates</h2>
            {currentDate >= appraisalVisibleStart && currentDate <= appraisalDueDate ? (
                <p className="text-md mb-2">
                    <span className="font-medium text-gray-700">Please complete your appraisal before: </span> 
                    <span className="underline">{appraisalDueDate.toLocaleDateString()}</span>
                </p>
            ) : (
                <p className="text-md mb-2">
                    <span className="font-medium p-2 text-gray-700">Appraisal Cycle: </span> 
                    <span className=" ">{appraisalStartDate} to {appraisalEndDate}</span>
                </p>
            )}

            {currentDate >= goalSettingVisibleStart && currentDate <= goalSettingDueDate ? (
                <p className="text-md mb-2">
                    <span className="font-medium p-2 text-gray-700">Please complete your goal setting before: </span> 
                    <span className="underline">{goalSettingDueDate.toLocaleDateString()}</span>
                </p>
            ) : (
                <p className="text-md mb-2">
                    <span className="font-medium p-2 text-gray-700">Goal Setting: </span> 
                    <span className="">{goalSettingStartDate} to {goalSettingEndDate}</span>
                </p>
            )}

            <p className="mt-6 text-sm p-2">
                Ensure your goals for the upcoming year are set during the designated period to align with organizational objectives.
            </p>
        </div>
    </div>
  );
};

export default Dashboard;