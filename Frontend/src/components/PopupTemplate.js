import {React, useState} from "react";

import mail from "../assets/mail.svg"
import phone from "../assets/phone.svg"
function HelpPopup() {
    const [showHelpPopup, setShowHelpPopup] = useState(false);
  
    const toggleHelpPopup = () => {
      setShowHelpPopup(!showHelpPopup);
    };
  
    return (
      <div className="relative">
        <div className="top-buttons flex z-10  absolute right-8 space-x-4 print:hidden">
          <button
            className="p-2 bg-white text-blue-900 font-bold text-sm text-button w-28 border border-blue-900 focus:scale-110 focus:bg-opacity-90 rounded"
            onClick={toggleHelpPopup}
          >
            Need Help?
          </button>
        </div>
  
        {showHelpPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-8 rounded shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={toggleHelpPopup}
              >
                X
              </button>
              <span className="text-gray-800 text-sm flex my-1 text-center">
                <img src={phone} alt="phone" className="mr-2" />
                Phone
              </span>
              <p className="mb-5">+1-789 3784 893</p>
              <span className="text-gray-800 text-sm flex my-1 text-center">
                <img src={mail} alt="email" className="mr-2" />
                Email
              </span>
              <p>hrms@thebluespire.com</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default HelpPopup;
  