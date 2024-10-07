import React, { useState } from 'react'


const ActionMenu = ({ isOpen, onClick, index }) => {
  return (
    <div className="relative">

      <button
        className="text-xl font-bold focus:outline-none"
        onClick={onClick}
      >
        •••
      </button>


      {isOpen && (
        <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 shadow-sm z-10">
          <ul className="list-none p-0 m-0">
            <li
              className="p-2 text-base cursor-pointer hover:bg-gray-200"
              onClick={() => alert(`View clicked for item ${index}`)}
            >
              View
            </li>
            <li
              className="p-2 text-base cursor-pointer hover:bg-gray-200"
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

const Profile = () => {
  const username = localStorage.getItem('username') || 'Naveen Kumar'
  const email = localStorage.getItem('email') || "naveen.pandranki@thebluespire.com"
  const gender = localStorage.getItem('gender') || "Male"
  const [profilePic, setProfilePic] = useState(null);
  const [filteredApps, setFilteredApps] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const handleEditPhoto = () => {
    alert('Edit Profile Photo Cliked')
  }
  const handleMenuClick = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  return (
    <div className='ml-28 mt-20 mr-6'>
      <h1 className='font-black text-3xl font-serif text-teal-400'>{username}</h1>

      <hr className='my-4'></hr>
      <br></br>
      <br />

      <div className='rounded-2xl  shadow-md '>

        <div className='flex'>
          <div className="w-36 ml-8 mr-4 space-y-2  h-36 rounded-full bg-gray-300  relative flex items-center justify-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-500">👤</span>
            )}


            <button
              className="absolute bottom-2 right-2 bg-white border border-gray-300 shadow-md rounded-full p-2 hover:bg-gray-100"
              onClick={handleEditPhoto}
            >
              ✏️
            </button>
          </div>

          <div className="space-x-2  ml-2 ">
            <h1 className='text-2xl text-wrap mt-2 text-orange-500 '>{username}</h1>
            <h1 className='text-xl text-wrap mt-2 text-blue-700'>{email}</h1>
            <h1 className='text-xl mt-2 text-blue-500'>{gender}</h1>

          </div>
          <div className='w-60 ml-28'>
            <h1 className='text-xl text-blue-500'>Designation/title</h1>

            <h1 className='Team Member'>Team Member</h1>

            <h1 className='mt-2 text-xl text-blue-500'>Department</h1>

            <h1>Information Tech</h1>

          </div>

          <div className='w-60 ml-28'>
            <h1 className='text-xl text-blue-500'>Location</h1>

            <h1>Hyderabad</h1>
            <h1 className='mt-2 text-xl text-blue-500'>Employment type </h1>
            <h1>Permanent (full time)</h1>
            <h1 className='mt-2 text-xl text-blue-500'>Band</h1>
            <h1>B4</h1>
          </div>
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <div className='' >
          <div className='border'>

          </div>


        </div>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
      <div className='rounded-2xl border-1 border-black shadow-md shadow-slate-400 '>
        <div className='ml-8 py-5'>
          <h1 className='text-xl font-bold '>Employment Details</h1>
          <text className='space-y-10 text-blue-300'>View or edit current employment details such as date of joining, designation, department, location, job description and more.</text>
          <br></br>

          <div className='mt-5'>
            <label className='text-blue-400'>Date of joining</label>
            <label className='ml-4'>xx/xx/xxxx</label>
            <br></br>
            <label className='mt-2 text-blue-400'>Designation/title</label>
            <label className='ml-2'>
              Team Member
            </label>
            <br></br>
            <label className='text-blue-400 mt-2'>Department</label>
            <label className=' ml-2'>Information Tech</label>
            <br></br>
            <label className='mt-2 text-blue-400'>Location</label>
            <label className='ml-2'>Hyderabad</label>
            <br></br>
          </div>
        </div>
      </div>

      <div className='rounded-2xl border-1 border-black shadow-md shadow-slate-400 mt-8 '>
        <div className='ml-8 mr-8 py-5'>
          <h1 className='mt-2 font-semibold'> Reporting Structure</h1>
          <text className='mt-10'>
            View details of reporting relationships and reportees. Click on any employee to view details of their profile. You can also view past reporting relationships</text>

        </div>
      </div>
      <div className='rounded-2xl border-1 border-black shadow-md shadow-slate-400 mt-8 mb-8'>

        <div className='ml-8 mr-8 py-5'>

          <h2 className='font-bold text-2xl'>Appraisals</h2>
          <br></br>
          <text className='text-sm text-slate-300 font-semibold'>View current and past appraisals. Click on the menu to view and print the evaluations.</text>


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
                    <td className="py-3 px-4 text-center"> <ActionMenu
                      isOpen={openMenuIndex === index}
                      onClick={() => handleMenuClick(index)}
                      index={index}
                    /></td>
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
    </div>

  )
}

export default Profile