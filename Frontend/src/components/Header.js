// Header.js 

import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const userRef = useRef(null);

  const username = localStorage.getItem('userName') || 'Naveen Pandranki'
const userInitial = username.charAt(0).toUpperCase();

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2.5 flex justify-between items-center h-[60px]">
    
      <div className="logo">
        <img src={logo} alt="Logo" className="h-14 w-auto" />
      </div>

      <div className="header-right flex items-center ml-5">
        <div className="search-bar flex items-center relative mr-10 border-none ">
          <input
            type="text"
            placeholder="Search..."
            className="searchbox pl-10 p-2.5 w-[400px] rounded-full   bg-slate-100"
          />
          <span className="search-icon absolute left-2.5">
            🔍
          </span>
        </div>

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

        <div className="relative" ref={userRef}>
          <button
            className="text-lg flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setShowUserDropdown(prev => !prev)}
          >
            {userInitial}
          </button>
          {showUserDropdown && (
            <div className="absolute top-full right-0 rounded-xl bg-white border border-gray-300 shadow-md z-10 w-[250px] mt-4">
              <div className='flex p-3'>
 <div className="w-8 ml-2 mr-4 space-y-2  h-8 rounded-full bg-gray-300  relative flex items-center justify-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-4xl text-gray-500">👤</span>
            )}
            </div>
            <div>
            <label className='mt-2'>Naveen Kumar</label>
            <p>Information Tech</p>
            </div>
              </div>
              <hr></hr>
              <ul className="list-none p-0 m-0">
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-gray-200" onClick={handleMyProfie}>
                  <i className="fas fa-user mr-3.5"></i> My Profile
                </li>
                <li className="p-3 text-base flex items-center cursor-pointer hover:bg-gray-200">
                  <i className="fas fa-lock mr-3.5"></i> Update Password
                </li>
                <li className="p-3 text-base text-center cursor-pointer hover:bg-blue-500 text-white bg-blue-400 rounded-md mt-2">
                  <button className='border-1 bg-red-700 text-center rounded-md'>Logout</button>
                  
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