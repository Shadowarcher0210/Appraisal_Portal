import React, { useState } from 'react';

const TABS = [
  "Introduction",
  "Goals",
  "Self Appraisal",

  "Performance improvement plan",
  "Submit",
];

const E_View = () => {
  const [activeTab, setActiveTab] = useState(0);


  const handleNext = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab((prevTab) => prevTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab((prevTab) => prevTab - 1);
    }
  };

  return (
    <div className="flex h-screen ml-24 mt-20">

      <div className="w-1/5 h-full bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-6">Forms</h2>
        <ul>
          {TABS.map((tab, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${activeTab === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-200'
                  }`}
                onClick={() => setActiveTab(index)}
                disabled={index > activeTab}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>


      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">{TABS[activeTab]}</h1>
        <div className="border p-4 rounded shadow-lg">
          {activeTab === 0 && <div>Content for Introduction</div>}
          {activeTab === 1 && <div>Content for Competencies</div>}
          {activeTab === 2 && <div>Content for Goals</div>}
          {activeTab === 3 && <div>Content for Self Appraisal</div>}
          {activeTab === 4 && <div>Content for 360 Feedback</div>}
          {activeTab === 5 && <div>Content for Development Plan</div>}
          {activeTab === 6 && <div>Ready to Submit</div>}
        </div>
        <div className="flex justify-between mt-8">
          {activeTab > 0 && (
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {activeTab < TABS.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => alert("Form Submitted!")}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default E_View;
