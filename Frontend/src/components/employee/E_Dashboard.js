import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../hrManager/Modal';


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
  const navigate = useNavigate();

  const data = [
    { name: 'Renuka Kompelly', manager: 'Sobha Rani', status: 'with employee' },
    { name: 'Bindu Pavani Veerla', manager: 'Tejaswi Peesapati', status: 'Submitted' },
    { name: 'RamaKrishna Shiva', manager: 'Sudhakar Adda', status: 'submitted' },
  ];

  const handleCreateAppraisal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMenuClick = (index) => {

    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };


  const handleConfigureAppraisalForms = () => {
    navigate('/configure-appraisal-forms');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="overflow-x-auto w-full max-w-6xl p-4 bg-white rounded-lg shadow-md mt-40">
        <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.manager}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700 cursor-pointer">

                  <ActionMenu
                    isOpen={openMenuIndex === index}
                    onClick={() => handleMenuClick(index)}
                    index={index}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <div className="mt-4 flex gap-4">
          <button
            onClick={handleCreateAppraisal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Appraisal for an Employee
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            View All Appraisals
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Send Emails
          </button>
          <button
            onClick={handleConfigureAppraisalForms}  // Added onClick handler
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Configure Appraisal Forms
          </button>
        </div>


        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Dashboard;
