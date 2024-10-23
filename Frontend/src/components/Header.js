import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'dashboard');

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

  const handleMyProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    localStorage.setItem('activeTab', tabName);
    navigate(path);
  };

  useEffect(() => {
    const userDetails = async () => {
      const userId = localStorage.getItem('userId');
      console.log('Retrieved userId:', userId);
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3003/all/details/${userId}`);
          setUserData(response.data);
          console.log('userdata', response.data);
          setUserInitial(employeeName.charAt(0).toUpperCase());
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        console.log('User ID not found in local storage.');
      }
    };
    userDetails();
  }, [employeeName]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-blue-100 to-blue-900 shadow-md z-50 p-4 rounded-md flex justify-between items-center h-[60px]">
      
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
      </div>

      {/* Navigation Tabs (beside logo) */}
      <div className="nav-links flex space-x-8 ml-10">
        <div
          className={`nav-item cursor-pointer ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabClick('dashboard', '/employee-dashboard')}
        >
          Dashboard
        </div>
        <div
          className={`nav-item cursor-pointer ${activeTab === 'performance' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => handleTabClick('performance', '/performance')}
        >
          Performance
        </div>
      </div>

      <div className="header-right flex items-center ml-auto">
        {/* Notification Button */}
        <div className="relative mr-10" ref={notificationRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setShowNotificationDropdown((prev) => !prev)}
          >
            <i className="fas fa-bell"></i>
          </button>
          {showNotificationDropdown && (
            <div className="absolute top-full right-2 w-[200px]  shadow-md z-10 mt-2">
              {/* <ul className="list-none p-0 m-0">
                <li className="p-3 text-base cursor-pointer hover:bg-gray-200">Notification 1</li>
                <li className="p-3 text-base cursor-pointer hover:bg-gray-200">Notification 2</li>
              </ul> */}
              {/* <div className="absolute top-full right-0 w-[200px] shadow-md z-10 mt-2 max-h-[300px] overflow-y-auto"> */}
        <div className="w-80 bg-white p-4 overflow-y-auto over h-screen  mt-2 shadow-lg max-h-[700px]">
        {/* <div className="absolute top-full right-0 w-[200px] shadow-md z-10 mt-2 overflow-y-auto max-h-60"> */}
        <div >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <ul className="space-y-4 overflow-y-auto max-h-[400px] mr-4 scroll-m-0.5">
            <li className="bg-gray-50 p-3 rounded-md mr-4 ">
              <p className="text-sm text-gray-600">John updated Project A status</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </li>
           
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">New team member added to Project B</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </li>
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">Budget approved for Project C</p>
              <p className="text-xs text-gray-400 mt-1">Yesterday</p>
            </li>
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">John updated Project A status</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </li>
           
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">New team member added to Project B</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </li>
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">Budget approved for Project C</p>
              <p className="text-xs text-gray-400 mt-1">Yesterday</p>
            </li>
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">John updated Project A status</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </li>
           
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">New team member added to Project B</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </li>
            <li className="bg-gray-50 p-3 rounded-md mr-4">
              <p className="text-sm text-gray-600">Budget approved for Project C</p>
              <p className="text-xs text-gray-400 mt-1">Yesterday</p>
            </li>
          </ul>
          </div>

          <h2 className="text-xl font-semibold my-4 mt-4 text-gray-800">Team Members</h2>
          <div className="flex flex-wrap gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">JD</div>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">AS</div>
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">TK</div>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">MR</div>
          </div>
        </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={userRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setShowUserDropdown((prev) => !prev)}
          >
            {userInitial}
          </button>
          {showUserDropdown && (
            <div className="absolute top-full right-0 rounded-md bg-white border border-gray-300 shadow-md z-10 w-[250px] mt-4">
              <div className="flex p-3">
                <div className="w-8 ml-2 mr-4 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {userData ? (
                    <img src={userData.user.profile} alt="Profile" className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-4xl text-gray-500">👤</span>
                  )}
                </div>
                <div>
                  <label className="mt-2">{userData?.user?.empName}</label>
                  <p>{userData?.user?.designation}</p>
                </div>
              </div>
              <hr />
              <ul className="list-none p-0 m-0">
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-gray-200" onClick={handleMyProfile}>
                  <i className="fas fa-user mr-3.5"></i> My Profile
                </li>
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-gray-200">
                  <i className="fas fa-lock mr-3.5"></i> Update Password
                </li>
                <li className="p-2 m-1 mb-2 text-base text-center cursor-pointer hover:bg-blue-500 text-white bg-blue-400 rounded-md mt-2">
                  <button className="border-1 text-center rounded-sm" onClick={handleLogout}>
                    Logout
                  </button>
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
