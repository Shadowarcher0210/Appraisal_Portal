
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const E_PerformancePage = () => {
  const navigate = useNavigate();
  const [appraisals, setAppraisals] = useState([]);


  const fetchAppraisalDetails = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3003/form/performance/${userId}`)
        setAppraisals(response.data);
        console.log('Fetched Appraisals in Performance Page :', response.data);
      } catch (error) {
        console.error('Error fetching appraisals in Performance page :', error)
      }
    }

  }
  useEffect(() => {
    fetchAppraisalDetails()
  }, []);

  const handleViewClick = () => {
    navigate('/view')
  }
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };


  return (
    <div className='justify-center items-start mt-20 ml-28'>
      <div>
        <div>
          <div className="w-12/12 p-4 bg-white border shadow-md rounded-md ml-4 mr-8">
            <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Initiated On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appraisals && appraisals.length > 0 ? (
                  appraisals.map((appraisal, index) => (
                    <tr key={appraisal.userId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.empName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {formatDate(appraisal.timePeriod[0])} -- {formatDate(appraisal.timePeriod[1])}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{formatDate(appraisal.timePeriod[0])}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.managerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 text-center">
                        <button className='bg-blue-500 text-white hover:bg-blue-600 rounded-md px-2 py-1' onClick={() => handleViewClick(appraisal)}>View</button>
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
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default E_PerformancePage;
