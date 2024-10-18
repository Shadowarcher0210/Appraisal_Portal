import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Leftnavbar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    
    return localStorage.getItem('activeTab') || 'dashboard';
  });

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName); 
    localStorage.setItem('activeTab', tabName); 
    navigate(path); 
  };

  useEffect(() => {
   
  }, [activeTab]);
  return (
    <div className="fixed top-0 left-0 w-24 bg-white h-[calc(100vh)] shadow-md flex flex-col items-center py-4 pt-20">
      
      {/* Dashboard Icon */}
      <div
        className={`nav-item flex flex-col items-center justify-center w-full h-20 group cursor-pointer ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-600'}`} 
        onClick={() => handleTabClick('dashboard', '/employee-dashboard')}
      >
        <div className="w-14 h-14 flex items-center justify-center transition-colors duration-300">
          <svg width="64" height="60" viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.6666 4.9173V13.8668C32.6666 15.0802 32.6666 15.687 32.921 16.1504C33.1447 16.5581 33.5016 16.8896 33.9407 17.0973C34.4398 17.3335 35.0932 17.3335 36.4 17.3335H46.0379M37.3333 28.1666H18.6666M37.3333 36.8333H18.6666M23.3333 19.5H18.6666M32.6666 4.33331H20.5333C16.6129 4.33331 14.6528 4.33331 13.1554 5.04177C11.8382 5.66495 10.7674 6.65932 10.0963 7.88237C9.33331 9.2728 9.33331 11.093 9.33331 14.7333V37.2666C9.33331 40.907 9.33331 42.7272 10.0963 44.1176C10.7674 45.3406 11.8382 46.335 13.1554 46.9582C14.6528 47.6666 16.6129 47.6666 20.5333 47.6666H35.4666C39.387 47.6666 41.3472 47.6666 42.8446 46.9582C44.1617 46.335 45.2326 45.3406 45.9037 44.1176C46.6666 42.7272 46.6666 40.907 46.6666 37.2666V17.3333L32.6666 4.33331Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm mt-2">Dashboard</span>
      </div>
      <hr className="w-14 my-2 border-gray-300" />

      {/* Performance Icon */}
      <div
        className={`nav-item flex flex-col items-center justify-center w-full h-20 group cursor-pointer ${activeTab === 'performance' ? 'text-blue-600' : 'text-gray-600'}`} 
        onClick={() => handleTabClick('performance', '/performance')}
      >
        <div className="w-14 h-14 flex items-center justify-center transition-colors duration-300">
          <svg width="52" height="48" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.1666 18.375L41.2573 11.7331C40.9007 9.12803 40.7224 7.82546 40.0509 6.84389C39.4593 5.97908 38.6048 5.29027 37.5915 4.86157C36.4415 4.375 35.0038 4.375 32.1284 4.375H13.8716C10.9962 4.375 9.55847 4.375 8.40844 4.86157C7.3952 5.29027 6.54061 5.97908 5.94904 6.84389C5.27759 7.82546 5.09927 9.12801 4.74262 11.7331L3.83331 18.375M10.5416 25.375H35.4583M10.5416 25.375C6.83674 25.375 3.83331 22.6327 3.83331 19.25C3.83331 15.8673 6.83674 13.125 10.5416 13.125H35.4583C39.1632 13.125 42.1666 15.8673 42.1666 19.25C42.1666 22.6327 39.1632 25.375 35.4583 25.375M10.5416 25.375C6.83674 25.375 3.83331 28.1173 3.83331 31.5C3.83331 34.8827 6.83674 37.625 10.5416 37.625H35.4583C39.1632 37.625 42.1666 34.8827 42.1666 31.5C42.1666 28.1173 39.1632 25.375 35.4583 25.375M11.5 19.25H11.5191M11.5 31.5H11.5191M23 19.25H34.5M23 31.5H34.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm mt-2">Performance</span>
      </div>
    </div>
  );
};

export default Leftnavbar;
