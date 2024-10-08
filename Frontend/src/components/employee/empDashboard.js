// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from '../hrManager/Modal';


// const ActionMenu = ({ isOpen, onClick, index }) => {
//   const navigate = useNavigate()
//   return (
//     <div className="relative">

//       <button
//         className="text-xl font-bold focus:outline-none"
//         onClick={onClick}
//       >
//         •••
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-md z-10">
//           <ul className="list-none p-0 m-0">
//             <li
//               className="p-3 text-base cursor-pointer hover:bg-gray-200"
//               onClick={() => navigate('/view')}
//             >
//               View
//             </li>
//             <li
//               className="p-3 text-base cursor-pointer hover:bg-gray-200"
//               onClick={() => alert(`Download clicked for item ${index}`)}
//             >
//               Download
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };


// const Dashboard = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [openMenuIndex, setOpenMenuIndex] = useState(null);
//   const [date,setDate]=useState(new Date());
//   const navigate = useNavigate();
//   const username = localStorage.getItem('username') || "Naveen Kumar"
  
//   const wishing =()=>{
//     const hour = date.getHours()
//     if(hour<12){
//       return 'Good Morning'
//     }
//     else if (hour < 18){
//       return 'Good Afternoon'
//     }
//     else  {
// return 'Good Evening'
//     }  }

//     const formatDate = (date) => {
//       const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
//       return date.toLocaleDateString(undefined, options);
//     };
  
//     const formatTime = (date) => {
//       return date.toLocaleTimeString([],{
//         hour:'2-digit',
//         minute : '2-digit',
//         hour12:true
//       }).toUpperCase();
//     };

//     useEffect(() => {
//       const timer = setInterval(() => setDate(new Date()), 1000);
//       return () => clearInterval(timer);
//     }, []);

//   const data = [
//     { name: 'Renuka Kompelly', manager: 'Sobha Rani', status: 'with employee' },
//     { name: 'Bindu Pavani Veerla', manager: 'Tejaswi Peesapati', status: 'Submitted' },
//     { name: 'RamaKrishna Shiva', manager: 'Sudhakar Adda', status: 'submitted' },
//   ];

//   const handleCreateAppraisal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleMenuClick = (index) => {

//     setOpenMenuIndex(openMenuIndex === index ? null : index);
//   };


//   const handleConfigureAppraisalForms = () => {
//     navigate('/configure-appraisal-forms');
//   };

//   return (
//     <div className=" justify-center items-start min-h-screen mt-20 ml-28">
//       <div>
// <label className='font-bold text-4xl w-full'>{wishing()}</label>
// <label className='ml-4 text-3xl font-bold text-orange-600'>{username},</label>

// <p>{formatDate(date)} <span> , </span>{formatTime(date)}</p>

//       </div>
//      <br>
//      </br>
      
//       <div className=" w-full max-w-6xl p-4 bg-white rounded-lg shadow-md ">
//         <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.manager}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700 cursor-pointer">

//                   <ActionMenu
//                     isOpen={openMenuIndex === index}
//                     onClick={() => handleMenuClick(index)}
//                     index={index}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>


//         <div className="mt-4 flex gap-4">
//           <button
//             onClick={handleCreateAppraisal}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Create Appraisal for an Employee
//           </button>
//           <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//             View All Appraisals
//           </button>
//           <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//             Send Emails
//           </button>
//           <button
//             onClick={handleConfigureAppraisalForms}  // Added onClick handler
//             className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
//           >
//             Configure Appraisal Forms
//           </button>
//         </div>


//         <Modal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
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
  const [date,setDate]=useState(new Date());
  const [view , setView] = useState();
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || "Naveen Kumar"
  
  const wishing =()=>{
    const hour = date.getHours()
    if(hour<12){
      return 'Good Morning'
    }
    else if (hour < 18){
      return 'Good Afternoon'
    }
    else  {
return 'Good Evening'
    }  }

    const formatDate = (date) => {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };
  
    const formatTime = (date) => {
      return date.toLocaleTimeString([],{
        hour:'2-digit',
        minute : '2-digit',
        hour12:true
      }).toUpperCase();
    };

    useEffect(() => {
      const timer = setInterval(() => setDate(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

  const data = [
    { empName: "Naveen Kumar", timePeriod :'01/04/2024 to 30/03/2025', joiningDate:'18/12/2023', manager: 'Sobha Rani', status: 'initiated', actions:'initiated' },
   
  ];

 

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMenuClick = (index) => {

    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  const handleViewPage = () =>{
navigate('/view')
  }


 

  return (
    <div className=" justify-center items-start   mt-20 ml-28 ">
      <div>
<label className='font-bold text-4xl w-full ml-2'>{wishing()}</label>
<label className='ml-2 text-3xl font-bold text-orange-600'>{username},</label>

<p className='ml-2'>{formatDate(date)} <span> , </span>{formatTime(date)}</p>

      </div>
     <br>
     </br>
      
      <div className=" w-11/12  p-4 bg-white border shadow-md rounded-md ml-4 mr-8">
        <h2 className="text-2xl font-bold text-white bg-blue-500 p-2 rounded mb-4">Appraisals</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">joining Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Manager</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} >
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{item.empName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{item.timePeriod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{item.joiningDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{item.manager}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"onClick={handleViewPage}>{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer">

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
  <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Dashboard;