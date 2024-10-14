import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../hrManager/Modal';
import axios from 'axios'

const ActionMenu = ({ isOpen, onClick, index }) => {
  const navigate = useNavigate()
  return (
    <div className="relative">

      <button
        className="text-xl font-bold focus:outline-none"
        onClick={onClick}
      >
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
          <ul className="list-none p-0 m-0">
            <li
              className="p-3 text-base cursor-pointer hover:bg-gray-200"
              onClick={() => navigate('/view')}
            >
              View
            </li>
            <li
              className="p-3 text-base cursor-pointer hover:bg-gray-200"
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
  const [date,setDate]=useState(new Date());
  const [view , setView] = useState();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchAppraisalDetails = async () => {
    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId:", userId);
    if (userId) {
        try {
            const response = await axios.get(`http://localhost:3003/form/display/${userId}`);
            setUserData(response.data);
            console.log("userdata", response.data); 
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    } else {
        console.log('User ID not found in local storage.');
    }
};

  useEffect(() => {
    console.log("useEffect called to fetch user details");

    fetchAppraisalDetails();
  }, []); 


  const wishing =()=>{
    const hour = date.getHours()
    if(hour<12){
      return 'Good Morning'
    }
    else if (hour < 18){
      return 'Good Afternoon'
    }
    else  {
return 'Good Evening'
    }  }

    const formatDate = (date) => {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };
  
    const formatTime = (date) => {
      return date.toLocaleTimeString([],{
        hour:'2-digit',
        minute : '2-digit',
        hour12:true
      }).toUpperCase();
    };

    // useEffect(() => {
    //   const timer = setInterval(() => setDate(new Date()), 1000);
    //   return () => clearInterval(timer);
    // }, []);

  // const data = [
  //   { empName: "Naveen Kumar", timePeriod :'01/04/2024 to 30/03/2025', joiningDate:'18/12/2023', manager: 'Sobha Rani', status: 'initiated', actions:'initiated' },
   
  // ];

 

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMenuClick = (index) => {

    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  const handleViewPage = () =>{
navigate('/view')
  }


 

  return (
    <div className=" justify-center items-start   mt-20 ml-28 ">
      <div>
      <label className='font-bold text-4xl w-full ml-2 mb-4'>{wishing()}</label>
      {userData ? (
            <label className='ml-2 text-3xl font-bold text-orange-600'>
              {userData.empName} {/* Displaying empName here */}
            </label>
        ) : (
          <p>Loading user data...</p>
        )}
         <p className='ml-2 mt-3'>{formatDate(date)} <span> , </span>{formatTime(date)}</p>

      </div>
     <br>
     </br>
      
      <div className=" w-11/12  p-4 bg-white border shadow-md rounded-md ml-4 mr-8">
        <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">joining Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { userData ? (
              <tr  >
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{userData.empName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>  {userData.timePeriod[0]} - {userData.timePeriod[1]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{userData.initiatedOn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{userData.managerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{userData.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer">

                  <ActionMenu
                  //  isOpen={openMenuIndex === index}
                  //  onClick={() => handleMenuClick(index)}
                   // index={index}
                  />
                </td>
              </tr>
           ):(
            <p></p>
           ) }
          </tbody>
        </table>
  <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Dashboard;