

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const Login = () => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const [credentials , setCredentials] = useState({email : '', password: ''})

//   const handleHomepage =() =>{
// navigate ('/home-page')
//   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Make a POST request to your login API
      const response = await axios.post('/api/login', credentials);

      // Save the token (you can also save it in local storage)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      const role = response.data.role;
      if (role === 'employee'){
        navigate('/employee-home');
      }
      else if (role === "manager"){
        navigate ('/manager-home')
      }
      else {
        navigate('hr-manager-home')
      }
      // Redirect to the user dashboard or desired page
      navigate('/dashboard'); // Adjust the route as necessary
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleChange =(e) => {
    const {name , value} = e.target;
    setCredentials ((prev)=>({
      ...prev,
      [name]:value,
    }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              id="email"
              name='email'
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display email error */}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name='password'
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 w-full hover:bg-blue-600 transition duration-200"
            
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={handleForgotPassword} 
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
