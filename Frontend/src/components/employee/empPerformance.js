
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios

const applications = [
  { id: 1, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Chandra Mouli', status: 'initiated' },
  { id: 2, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Tejaswi', createdDate: '2023-01-30' },
  { id: 3, timePeriod: '01/04/2024 to 31/03/2025', manager: 'sudhakar', createdDate: '2023-04-10' },
  { id: 4, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Tyson', createdDate: '2024-02-20' },
  { id: 5, timePeriod: '01/04/2024 to 31/03/2025', manager: 'Kiran', createdDate: '2024-04-05' },
];

const getAcademicYearRange = (year) => {
  const start = new Date(year, 3, 1);
  const end = new Date(year + 1, 2, 31, 23, 59, 59, 999);
  return { start, end };
};

const ActionMenu = ({ isOpen, onClick, index }) => {
  return (
    <div className="relative">
      <button className="text-xl font-bold focus:outline-none" onClick={onClick}>
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
          <ul className="list-none p-0 m-0">
            <li className="p-2 text-base cursor-pointer hover:bg-gray-200" onClick={() => alert(`View clicked for item ${index}`)}>
              View
            </li>
            <li className="p-2 text-base cursor-pointer hover:bg-gray-200" onClick={() => alert(`Download clicked for item ${index}`)}>
              Download
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const E_PerformancePage = () => {
  const [filteredApps, setFilteredApps] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [file, setFile] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); 

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3;
    const years = [];

    for (let i = startYear; i <= currentYear; i++) {
      years.push(`${i}-${i + 1}`);
    }
    setAcademicYears(years);
    const defaultYear = currentYear - (new Date().getMonth() < 3 ? 1 : 0);
    setSelectedYear(`${defaultYear}-${defaultYear + 1}`);
  }, []);

  const handleMenuClick = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  useEffect(() => {
    if (selectedYear) {
      const startYear = parseInt(selectedYear.split('-')[0], 10);
      const { start, end } = getAcademicYearRange(startYear);
      const filtered = applications.filter((app) => {
        const appDate = new Date(app.createdDate);
        return appDate >= start && appDate <= end;
      });

      setFilteredApps(filtered);
    }
  }, [selectedYear]);

  const uploadLetter = async () => {
    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId:", userId);

    if (userId) {
      try {
        const response = await axios.get('http://localhost:3003/letter/upload');
        console.log("response", response.data);
      } catch (error) {
        console.error('Error in uploading:', error);
      }
    } else {
      console.log('User ID not found in local storage.');
    }
  };

  useEffect(() => {
    console.log("useEffect called to post letter");
    uploadLetter();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file); 
     // handleFileUpload(file);
    }
};

  const handleFileUpload = async () => {
    const token = localStorage.getItem('token'); 
    const formData = new FormData();
    formData.append('appraisalLetter', file); 
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3003/letter/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('File uploaded successfully:', response.data);
      setUploadStatus('File uploaded successfully!');
      setFile(null);

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.'); 
    }  finally {
      setLoading(false); 
    }
  };
  // useEffect(() => {
  //   if (file) {
  //     handleFileUpload(); // Call the upload function
  //   }
  // }, [file]);

  return (
    <div className='ml-28 mt-20'>
      <div>
        <div>
          <label className='ml-6 pl-4 border-gray-100 rounded-lg py-1 p-1 bg-slate-100'>
            <label htmlFor="time-period" className=''>Time Period : </label>
            <select
              id="time-period"
              value={selectedYear}
              className='p-1 bg-gray-100 rounded-lg'
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <br />
          <br />
          <div className='ml-8 mr-8 '>
            <h2 className='font-bold text-2xl'>Appraisal</h2>
            <br />
            <text className='text-sm text-black '>Your performance appraisals for the selected time period are displayed below. Click on the View or edit appraisal button to complete your self appraisal (if applicable) or view the ratings given by your manager (once ready to be viewed)</text>

            <table className='border-collapse border-black rounded-t-xl w-full mt-5 '>
              <thead className='bg-blue-500 h-11 rounded-xl'>
                <tr className='rounded-t-lg'>
                  <th className='w-1/4'>Time Period</th>
                  <th className='w-1/4'>Manager</th>
                  <th className='w-1/4'>Status</th>
                  <th className='w-1/4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length > 0 ? (
                  filteredApps.map((app, index) => (
                    <tr key={app.id} className="bg-gray-100 border-b border-gray-200 ">
                      <td className="py-3 px-4 text-center">{app.timePeriod}</td>
                      <td className='py-3 px-4 text-center'>{app.manager}</td>
                      <td className='py-3 px-4 text-center'>{app.status}</td>
                      <td className="py-3 px-4 text-center"> 
                        <ActionMenu
                          isOpen={openMenuIndex === index}
                          onClick={() => handleMenuClick(index)}
                          index={index}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-3 px-4 text-center text-gray-500">
                      No applications found for the selected academic year.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <br />
        <br />
        <div>
          <h2 className='font-bold text-xl ml-10'>Appraisal Letters</h2>
          <div className="mr-8 p-6 ml-8 mt-6 bg-white border border-gray-200 shadow-lg rounded-lg">
            <p className="text-sm text-gray-600 mb-6">Please upload your appraisal letter in PDF, DOC, or DOCX format. Make sure the file size is less than 10MB.</p>
            
            <div className="flex items-center justify-between">
              <label className="block">
                <span className="sr-only">Choose File</span>
                <input type="file" onChange={handleFileChange} />
              </label>
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!file || loading}
              >
            {loading ? 'Uploading...' : 'Upload'}
            </button>
            </div>
            {file && (
          <p className="mt-4 text-sm text-gray-700">Selected file: {file.name}</p>
            )} 
             {uploadStatus && (
          <p className="mt-4 text-sm text-red-500">{uploadStatus}</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default E_PerformancePage;
