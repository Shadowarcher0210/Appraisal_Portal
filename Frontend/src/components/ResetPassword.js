import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios'; 

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, token); // Check if params are being populated correctly
    try {
      const response = await axios.post(`http://localhost:3003/auth/resetPassword/${id}/${token}`, { password });
      localStorage.setItem('token', response.data.token);
      setSuccessMessage('Password changed successfully!'); 
      setTimeout(() => {
        navigate('/');  }, 2000);  
       } 
    catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-auto ">
        <h2 className="text-2xl font-bold mb-6 mt-3 text-center ">Reset your password</h2>
     
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium mb-4" htmlFor="password">
            Enter a new password below to change your current password            </label>
            <input
              type="password"
              placeholder="Enter new password"
              id="password"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 w-full mb-4 hover:bg-blue-600 transition duration-200"
          >
            Reset password
          </button>
          {successMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {successMessage}
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;