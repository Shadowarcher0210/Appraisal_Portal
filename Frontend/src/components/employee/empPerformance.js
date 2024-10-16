
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios




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
  
  const [appraisalForms , setAppraisalForms] = useState([]);
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

const fetchAllAppraisalDetails=async () =>{
  const userId = localStorage.getItem('userId');
  if(userId){
    try{
      const response = await axios.get(`http://localhost:3003/form/display/${userId}`);
      setAppraisalForms(response.data);
      console.log("usersappraisalform",appraisalForms)
    }
    
  catch(error){
    console.error('Error fetching appraisal forms', error);
  }
}
};
useEffect(()=>{
  fetchAllAppraisalDetails();
},[])



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
    <div className='justify-center items-start mt-20 ml-28'>
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
          <div className='w-12/12 p-4 bg-white border shadow-md rounded-md ml-4 mr-8'>
            <h2 className='text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-2'>Appraisals</h2>
            <br />
            <text className='text-sm text-black '>Your performance appraisals for the selected time period are displayed below. Click on the View or edit appraisal button to complete your self appraisal (if applicable) or view the ratings given by your manager (once ready to be viewed)</text>

            <table className='min-w-full divide-y divide-gray-20 mt-3'>
              <thead className='bg-gray-100'>
                <tr className='rounded-t-lg'>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ">Band</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Assesment year</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Initiated On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" >
                {appraisalForms.length > 0 ? (
                  appraisalForms.map((appraisal, index) => (
                    <tr key={index} className="bg-gray-100 border-b border-gray-200 ">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.empName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center">{appraisal.band}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center">
                      {appraisal.timePeriod[0]} - {appraisal.timePeriod[1]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center">{appraisal.initiatedOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{appraisal.managerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center">{appraisal.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer">
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
                    <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
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
