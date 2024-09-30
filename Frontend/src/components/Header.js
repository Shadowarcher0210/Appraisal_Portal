import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notificationRef = useRef(null);
  const userRef = useRef(null);

  // Function to handle clicks outside of dropdowns
  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotificationDropdown(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
      setShowUserDropdown(false);
    }
  };

  // UseEffect to add and cleanup event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Dependency array is empty to run once when component mounts

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2.5 flex justify-between items-center h-[60px]">
      {/* Logo section */}
      <div className="logo">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
      </div>

      {/* Search bar */}
      <div className="header-right flex items-center ml-5">
        <div className="search-bar flex items-center relative mr-10">
          <input
            type="text"
            placeholder="Search..."
            className="searchbox pl-10 p-2.5 w-[400px] rounded-md"
          />
          <span className="search-icon absolute left-2.5">
            🔍
          </span>
        </div>

        {/* Notification icon with dropdown */}
        <div className="relative mr-10" ref={notificationRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setShowNotificationDropdown(prev => !prev)}
          >
            <i className="fas fa-bell"></i>
          </button>
          {showNotificationDropdown && (
            <div className="absolute top-full right-0 w-[200px] bg-white border border-gray-300 shadow-md z-10 mt-2">
              <ul className="list-none p-0 m-0">
                <li className="p-3 text-base cursor-pointer hover:bg-gray-200">Notification 1</li>
                <li className="p-3 text-base cursor-pointer hover:bg-gray-200">Notification 2</li>
              </ul>
            </div>
          )}
        </div>

        {/* User profile with dropdown */}
        <div className="relative" ref={userRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setShowUserDropdown(prev => !prev)}
          >
            👤
          </button>
          {showUserDropdown && (
            <div className="absolute top-full right-0 bg-white border border-gray-300 shadow-md z-10 w-[200px] mt-2">
              <ul className="list-none p-0 m-0">
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-gray-200">
                  <i className="fas fa-user mr-3.5"></i> My Profile
                </li>
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-gray-200">
                  <i className="fas fa-lock mr-3.5"></i> Update Password
                </li>
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-blue-500 text-white bg-blue-400 rounded-md mt-2">
                  Logout
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
