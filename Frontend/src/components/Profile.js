import React, { useState } from 'react'

const Profile = () => {
  const username = localStorage.getItem('username') || 'Naveen Kumar'
  const [profilePic, setProfilePic] = useState(null);
  const handleEditPhoto = () =>{
    alert('Edit Profile Photo Cliked')
  }
  return (
    <div className='ml-28 mt-20'>
        <h1 className='font-black text-3xl font-serif text-teal-400'>{username}</h1>
        
        <hr className='my-4'></hr>
        <br></br>

        <div className=' border border-black shadow-2xl '>
          
          <div className="w-40   h-40 rounded-full bg-gray-300  relative flex items-center justify-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-500">👤</span>
            )}
            
            {/* Pencil Icon for Edit */}
            <button
              className="absolute bottom-2 right-2 bg-white border border-gray-300 shadow-md rounded-full p-2 hover:bg-gray-100"
              onClick={handleEditPhoto}
            >
              ✏️
            </button>
          </div>
        
          <div>
<h1>{username}</h1>

          </div>
          <br></br>
          <hr></hr>
<br></br>
<div >

</div>
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <div className='rounded-full border-1 border-black shadow-xl'>
fffff
        </div>
        <div className='rounded-full border-1 border-black'>

        </div>
        <div className='rounded-full border-1 border-black'>

        </div>
    </div>
  )
}

export default Profile