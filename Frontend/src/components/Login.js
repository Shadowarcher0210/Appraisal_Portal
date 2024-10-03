// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios'; 

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3005/api/v1/auth/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/dashboard'); 
//     } 
//     catch (error) {
//       setErrorMessage('Invalid email or password. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="border border-gray-300 rounded-lg p-2 w-full"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="border border-gray-300 rounded-lg p-2 w-full"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white rounded-lg py-2 w-full hover:bg-blue-600 transition duration-200"
//           >
//             Login
//           </button>
//         </form>
        
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [emailError, setEmailError] = useState(''); // State for email error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/api/v1/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); 
    } 
    catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setEmailError('Please enter your email address.'); // Set email error message if empty
      return;
    }
    setEmailError(''); // Clear error message
    setIsPopupVisible(true); // Show the popup if email is provided
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };

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
              id="email"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>} {/* Display email error */}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Forgot Password link */}
        <p className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </p>

        {/* Popup for password reset */}
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-bold mb-4">Check your email</h3>
              <p>A link to reset your password has been sent to your email.</p>
              <button
                onClick={closePopup}
                className="mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
