import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Header = () => {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'dashboard');
  const [appraisalNotification, setAppraisalNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const userRef = useRef(null);
  const employeeName = localStorage.getItem('empName');

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotificationDropdown(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
      setShowUserDropdown(false);
    }
  };
  const handleMyProfie = () =>{
    navigate('/profile')
  }
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/')
  }
  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    localStorage.setItem('activeTab', tabName);
    navigate(path);
  };
useEffect(()=>{
  const userDetails = async () => {
    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId:", userId);
    if (userId) {
        try {
            const response = await axios.get(`http://localhost:3003/all/details/${userId}`);
            setUserData(response.data);
            console.log("userdata", response.data); 
            setUserInitial(employeeName.charAt(0).toUpperCase())
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    } else {
        console.log('User ID not found in local storage.');
    }
  };
  userDetails()
   },[])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchAppraisalNotification = async () => {
    const userId = localStorage.getItem('userId');
    const startDate = localStorage.getItem('initiatedOn') || new Date().toISOString().split('T')[0];

    if (!userId) {
      console.warn('No userId found in localStorage');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching notification for:', { userId, startDate });
      const response = await axios.get(`http://localhost:3003/form/expiry/${userId}/${startDate}`);
      
      console.log('API Response:', response.data);
      
      if (response.data.message) {
        setAppraisalNotification(response.data.message);
      } else {
        console.warn('No message in response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching appraisal notification:', error);
      setError(error.response?.data?.message || 'Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
      if (showNotificationDropdown) {
        fetchAppraisalNotification();
      }
    }, [showNotificationDropdown]);
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2.5 flex justify-between items-center h-[50px]">
    
      <div className="logo">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </div>
    <div className="fixed ml-36 left-0  flex space-x-8 ">
        <div
    className={`nav-item cursor-pointer relative ${activeTab === 'dashboard' ? 'text-blue-600 after:content-[""] after:absolute after:left-0 after:bottom-[-13px] after:w-full after:h-[2px] after:bg-blue-600' : 'text-gray-600'}`}
    onClick={() => handleTabClick('dashboard', '/employee-dashboard')}
        >
          Dashboard
        </div>
        <div
    className={`nav-item cursor-pointer relative ${activeTab === 'performance' ? 'text-blue-600 after:content-[""] after:absolute after:left-0 after:bottom-[-13px] after:w-full after:h-[2px] after:bg-blue-600' : 'text-gray-600'}`}
    onClick={() => handleTabClick('performance', '/performance')}
        >
          Performance
        </div>
      </div>
      <div className="header-right flex items-center ml-5">
        {/* <div className="search-bar flex items-center relative mr-10 border-none ">
          <input
            type="text"
            placeholder="Search..."
            className="searchbox pl-10 p-2.5 w-[400px] rounded-full   bg-slate-100"
          />
          <span className="search-icon absolute left-2.5">
            🔍
          </span>
        </div> */}

        {/* <div className="relative mr-4" ref={notificationRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 hover:bg-gray-200 hover:text-white rounded-full"
            onClick={() => setShowNotificationDropdown(prev => !prev)}
          >
            <i className="fas fa-bell text-gray-600"></i>
          </button>
         
        </div> */}
      
      <div className="relative mr-4" ref={notificationRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setShowNotificationDropdown((prev) => !prev)}
          >
            <i className="fas fa-bell"></i>
          </button>
          {showNotificationDropdown && (
            <div className="w-80 bg-white p-4 absolute top-full right-0 shadow-lg mt-2 rounded-md max-h-[700px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Notifications</h2>
              
         
              {isLoading && (
                <div className="text-center py-4">
                  <p className="text-gray-600">Loading notifications...</p>
                </div>
              )}

           
              {error && (
                <div className="bg-red-50 p-4 rounded-md mb-4 border-l-4 border-red-400">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

            
              {!isLoading && !error && appraisalNotification && (
                <div className="bg-yellow-50 p-4 rounded-md mb-4 border-l-4 border-yellow-400">
                  <p className="text-sm text-gray-800">{appraisalNotification}</p>
                  <p className="text-xs text-gray-500 mt-1">Appraisal Status</p>
                </div>
              )}

           
              {!isLoading && !error && !appraisalNotification && (
                <div className="text-center py-4">
                  <p className="text-gray-600">No notifications available</p>
                </div>
              )}

        
              <h3 className="text-lg font-semibold my-4 text-gray-800">Team Members</h3>
              <div className="flex flex-wrap gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">JD</div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">AS</div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">TK</div>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">MR</div>
              </div>
            </div>
          )}
        </div>
          
        <div className="relative" ref={userRef}>
       <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-400"
            onClick={() => setShowUserDropdown(prev => !prev)}
          >    {userInitial}
          </button>
          {showUserDropdown && (
            <div className="absolute top-full right-0 rounded-md bg-white border border-gray-300 shadow-md z-10 w-[250px] mt-4">
              <div className='flex p-3'>
          <div className="w-8 mr-4 space-y-2  h-8 rounded-full bg-gray-300  relative flex items-center justify-center">
            {userData ? (
                 <button
                 className="text-lg flex items-center justify-center w-8 h-8 bg-blue-500 text-white font-medium rounded-full "
               >    {userInitial}
               </button>
              // <img src={userInitial} alt="Profile" className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-4xl text-gray-500">{userInitial}</span>
            )}
            </div>
            <div>
            <label className='mt-2'>{userData.user.empName}</label>
            <p className='text-sm'>{userData.user.designation}</p>
            </div>
              </div>
              <hr></hr>
              <ul className="list-none p-0 m-0">
                <li className="p-4 text-base flex items-center cursor-pointer hover:bg-gray-200" onClick={handleMyProfie}>
                  <i className="fas fa-user mr-3.5"></i> My Profile
                </li>
                <li className="p-4 text-base flex items-center cursor-pointer hover:bg-gray-200">
                  <i className="fas fa-lock mr-3.5"></i> Update Password
                </li>
                <li className="p-2  m-1 mb-2 text-base text-center cursor-pointer hover:bg-blue-500 text-white bg-blue-400 rounded-md mt-2">
                  <button className='border-1 text-center rounded-sm' onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;