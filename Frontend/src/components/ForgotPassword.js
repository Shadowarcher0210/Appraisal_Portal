import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/api/v1/auth/forgotPassword', { email });
      localStorage.setItem('token', response.data.token);
      navigate('/'); 
    } 
    catch (error) {
      console.error('Error sending forgot password request', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder='enter email'
              id="email"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 w-full hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
