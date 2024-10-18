import React, { useState, useEffect  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const TABS = [
  "Introduction",
  // "Goals",
  "Self Appraisal",
];

const EmpForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [weights, setWeights] = useState(Array(15).fill(0));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selfAppraisalPage, setSelfAppraisalPage] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isGoalSectionOpen, setIsGoalSectionOpen] = useState(false);
  const [goalText, setGoalText] = useState('');
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const location = useLocation();
  const {timePeriod} = location.state || {}


  const handleAddGoal = () => {
    setIsGoalSectionOpen(true);
  };

  const handleSaveGoal = () => {
    console.log('Saved Goal:', goalText);
    setIsGoalSectionOpen(false);
    setGoalText('');
  };

  const handleExitGoal = () => {
    setIsGoalSectionOpen(false);
    setGoalText('');
  };


  const updateWeight = (index, percentage) => {
    const newWeights = [...weights];
    newWeights[index] = percentage;
    setWeights(newWeights);
  };

  const handleContinue = () => {
    if (activeTab === 1 && selfAppraisalPage === 0) {
      setSelfAppraisalPage(1);
    } else if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
      setSelfAppraisalPage(0);
      setCompletedSteps(Math.max(completedSteps, activeTab + 1));
    }
  };

  const handlePreviousForm = () => {
    if (selfAppraisalPage > 0) {
      setSelfAppraisalPage(selfAppraisalPage - 1);
    } else if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleSaveandexit = () => {
    navigate('/employee-dashboard');
  };
  

 

  const userDetails = async () => {
    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId:", userId);

    if (userId) {
      
        try {
            const response = await axios.get(`http://localhost:3003/all/details/${userId}`);
            setEmail(response.data.user.email);
            console.log("email", response.data.user.email); 
          } catch (error) {
            console.error('Error fetching user details:', error);
        }
    } else {
        console.log('User ID not found in local storage.');
    }
};
useEffect(() => {
  console.log("useEffect called to fetch user details");

  userDetails();
}, []); 
const handleSubmit = () => {
 setIsModalOpen(true)
   // Show the modal asking for confirmation
};

  const handleConfirmSubmit = async () => {
    setIsModalOpen(false);
    setIsThankYouModalOpen(true);
    
    
    // Simulate an async operation or API call
   
    
    
       try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const emailresponse = await fetch(`http://localhost:3003/confirmationEmail/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email
            }),
        });
        const emailData = await emailresponse.json();
        console.log(emailData.message);
    
        const userId = localStorage.getItem('userId');
  

        const response = await axios.put(`http://localhost:3003/form/status/${userId}/${timePeriod[0]}/${timePeriod[1]}`,{status : 'Submitted'})

        if(response.status === 200){
          console.log('Status updated Successfully :',response.data);
          
        }else{
          console.error('Failed to update status :',response.statusText)
        }
            }catch(error){
              console.error('Error updating status:', error);
            }
            finally {
              // Optionally reopen the modal or perform any cleanup
              setIsModalOpen(true);
            }
   
    
 
};


  const closeModal = () => {
    setIsModalOpen(false);
    // navigate('/employee-dashboard');
  };
  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false);
    navigate('/employee-dashboard');
  };


  const handleBack = () => {
    navigate('/employee-dashboard');
  };

  const instructionsList = [
    'You fill your appraisal and submit to your manager.',
    'Your manager fills their comments and ratings for your appraisal and submits to HR.',
    'HR finalizes your appraisal.',
    'Your manager discusses the appraisal with you and submits for your acceptance.',
    'You accept the appraisal to close the process for this year.',

  ];

  const impInstructions = [
    'It is mandatory to provide ratings and comments against all Competencies in the Competency Form and Goals in the Goal Sheet form. These ratings help you in defining your achievements as also help your manager in entering in ratings and comments while filling up your appraisal.',
    'As a good practice, go through all the forms and understand what data is required to be filled in. While you can complete the appraisal in multiple sittings, it may be a good idea to collect all the details prior to your starting to fill in the forms.',
  ];

  return (
    <div className="flex h-screen ml-24 mt-16">
      <div className="w-48 h-full bg-gray-100 p-4 fixed">
        <h2 className="text-lg font-bold mb-6">Forms</h2>
        <ul>
          {TABS.map((tab, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${activeTab === index
                    ? 'bg-blue-500 text-white'
                    : index <= completedSteps
                      ? 'bg-white hover:bg-gray-200'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={() => {
                  if (index <= completedSteps) {
                    setActiveTab(index);
                    setSelfAppraisalPage(0);
                    // } else {
                    //   alert('Please complete the current section before proceeding.');
                  }
                }}
                disabled={index > completedSteps}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8 ml-44">
        <div className="border p-4 rounded shadow-lg">
          {/* 
         */}
          {activeTab === 0 && (
            <div className="relative h-full flex flex-col px-6 py-4 bg-gray-50 rounded-lg shadow-md">
              <h1 className="text-4xl font-bold text-orange-500 mb-4">Introduction</h1>
              <p className="text-gray-700 mb-6">
                Welcome to the Employee Appraisal Process! Below you'll find detailed instructions and FAQs to help you navigate through the steps smoothly.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">Steps to Follow:</h2>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {instructionsList.map((list, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <span className="mr-2 text-orange-400 text-lg">≫</span>
                    <span>{list}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">FAQs:</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {impInstructions.map((list, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <span className="mr-2 text-orange-400 text-lg">≫</span>
                    <span>{list}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-red-500 mb-2">Important Instructions</h2>
              <ul className="list-disc list-inside text-gray-600 mb-8">
                {impInstructions.map((list, index) => (
                  <li key={index} className="flex items-start mb-2">
                    <span className="mr-2 text-red-500 text-lg">≫</span>
                    <span>{list}</span>
                  </li>
                ))}
              </ul>

              <div className="sticky bottom-0 mt-auto bg-gray-50 py-4 flex justify-between items-center space-x-2  border-gray-300">
                <button
                  className="bg-orange-400 hover:bg-orange-500 transition duration-300 text-white font-semibold py-2 px-6 rounded-lg"
                  onClick={handlePreviousForm}
                >
                  Back
                </button>
                <button
                  className="bg-orange-400 hover:bg-orange-500 transition duration-300 text-white font-semibold py-2 px-6 rounded-lg"
                  onClick={handleContinue}
                >
                  Continue
                </button>
                {/* <button className="bg-orange-400 text-white px-4 py-2" onClick={handleSaveandexit}>Save & Exit</button> */}
              </div>
            </div>
          )}

          {/* {activeTab === 1 && (
            <div className="relative h-full flex flex-col">
              <h1>Goals</h1>
              <p>Content for the Goals tab.</p>

              {!isGoalSectionOpen && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-48 ml-8"
                  onClick={handleAddGoal}
                >
                  Add Your First Goal
                </button>
              )}


              {isGoalSectionOpen && (
                <div className="border rounded-lg p-4 mt-4 shadow-lg bg-gray-100">
                  <h >Comments</h>
                  <textarea
                    className="w-full h-24 border border-gray-300 rounded p-2 resize-none mt-4"
                    placeholder="Enter your goal..."
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                  ></textarea>

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      className={`px-4 py-2 rounded ${goalText.trim()
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      onClick={handleSaveGoal}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={handleExitGoal}
                    >
                      Exit
                    </button>
                  </div>
                </div>
              )}

              <div className="sticky bottom-0 bg-white py-4 flex justify-end space-x-2">
                <button className="bg-orange-400 rounded-lg p-2 text-white px-4 mr-auto" onClick={handlePreviousForm}>Back</button>
                <button className="bg-orange-400 rounded-lg  text-white px-4 " onClick={handleContinue}>Continue</button>
              </div>
            </div>
          )
          } */}

          {activeTab ===1  && (
            <>
              {selfAppraisalPage === 0 && (
                <div className="relative h-full flex flex-col">
                  <h1 className="font-normal">Please tick your response for self appraisal</h1>
                  <table className="border border-gray-800 w-full mt-4 rounded-lg">
                    <thead className="border border-blue-500  bg-blue-500 rounded-lg ">
                      <tr className=' text-white font-medium  text-center text-md'>
                        <td className='border-r border-gray-800 '>Self-Assesment Areas</td>
                        <td className='border-r border-gray-800 p-2'>Strongly Disagree</td>
                        <td className='border-r border-gray-800'>Somewhat Disagree</td>
                        <td className='border-r border-gray-800'>Agree</td>
                        <td className='border-r border-gray-800'>Somewhat Agree</td>
                        <td className='border-r border-gray-800'>Strongly Agree</td>
                        <td className='border-r border-gray-800'>Notes</td>
                        <td className='border-r border-gray-800'>Weight</td>
                        <td className='border-r border-gray-800'>Attainment</td>
                      </tr>
                    </thead>
                    <tbody >
                      {[
                        "Job-Specific Knowledge: I possess and apply the expertise, experience, and background to achieve solid results.",
                        "I work effectively and efficiently.",
                        "Job-Specific Skills: I demonstrate the aptitude and competence to carry out my job responsibilities.",
                        "Adaptability: I am flexible and receptive regarding new ideas and approaches.",
                        "In response to the fluctuating demands of my job, I adapt easily to plans, goals, actions, and priorities.",
                        "Collaboration: I cultivate positive relationships. I am willing to learn from others.",
                        "Communication: I convey my thoughts clearly and respectfully.",
                        "Job-Specific Knowledge: I work effectively and efficiently.",
                        "I demonstrate effective listening skills.",
                        "Results: I identify goals that are aligned with the organization’s strategic direction and achieve results accordingly.",
                        "I persist through significant difficulties to achieve those goals.",
                        "Initiative: I anticipate needs, solve problems, and take action, all without explicit instructions.",
                        "I take the initiative to discover new work challenges and to help shape events that will lead to the organization’s success.",
                        "Development: I am committed to improving my knowledge and skills.",
                        "Growth: I am proactive in identifying areas for self-development."
                      ].map((text, index) => (
                        <tr key={index} className='text-center'>
                          <td className="border p-2 border-gray-800 w-96">{text}</td>
                          <td className="border border-gray-800">
                            <input
                              className='size-4'
                              type="radio"
                              name={`feedback-${index}`}
                              onChange={() => updateWeight(index, 20)}
                            />
                          </td>
                          <td className="border border-gray-800 w-24">
                            <input
                              className='size-4'
                              type="radio"
                              name={`feedback-${index}`}
                              onChange={() => updateWeight(index, 40)}
                            />
                          </td>
                          <td className="border border-gray-800 w-24">
                            <input
                              className='size-4'
                              type="radio"
                              name={`feedback-${index}`}
                              onChange={() => updateWeight(index, 60)}
                            />
                          </td>
                          <td className="border border-gray-800">
                            <input
                              className='size-4'
                              type="radio"
                              name={`feedback-${index}`}
                              onChange={() => updateWeight(index, 80)}
                            />
                          </td>
                          <td className="border border-gray-800">
                            <input
                              className='size-4'
                              type="radio"
                              name={`feedback-${index}`}
                              onChange={() => updateWeight(index, 100)}
                            />
                          </td>

                          <td className="border p-0 border-gray-800 w-24">
                            <textarea
                              className="w-full  h-full outline-none border-none resize-none"
                            ></textarea>
                          </td>
                          <td className="border p-2 border-gray-800 w-20">
                            {/* <textarea
                              className="w-full h-full outline-none border-none resize-none"
                            ></textarea> */}
                          </td>

                          <td className="border p-2 border-gray-800">{weights[index]}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="sticky bottom-0 mt-8 bg-white py-4 flex justify-end space-x-2">
                    <button className="bg-orange-400 rounded-lg p-2 text-white px-4  mr-auto" onClick={handlePreviousForm}>Back</button>
                    {/* <button className="bg-orange-400 rounded-lg p-2 text-white px-4 " onClick={handleSaveandexit}>Save & Exit</button> */}
                    <button className="bg-orange-400 rounded-lg p-2 text-white px-4" onClick={handleContinue}>Continue</button>

                  </div>
                </div>
              )}
              {selfAppraisalPage === 1 && (
                <div className="relative h-full flex flex-col">
                  <h1 className="font-bold text-center">Competencies</h1>

                  <div className="mt-4 flex-1 overflow-y-auto">

                    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
                      <h2 className="font-semibold mb-2">Adaptability </h2>
                      <p>I am flexible and receptive regarding new ideas and approaches</p>
                      <textarea
                        className="w-full h-24 border border-gray-300 rounded p-2 mt-2 resize-none"
                        placeholder="Type your answer here..."
                      ></textarea>
                    </div>

                    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
                      <h2 className="font-semibold mb-2">Collaboration</h2>
                      <p>I Cultivate Positive Relationships .I am willing to learn from others</p>
                      <textarea
                        className="w-full h-24 border border-gray-300 rounded p-2 mt-2 resize-none "
                        placeholder="Type your answer here..."
                      ></textarea>
                    </div>

                    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
                      <h2 className="font-semibold mb-2">Collaboration</h2>
                      <p>I Cultivate Positive Relationships .I am willing to learn from others</p>
                      <textarea
                        className="w-full h-24 border border-gray-300 rounded p-2 mt-2 resize-none "
                        placeholder="Type your answer here..."
                      ></textarea>
                    </div>

                    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
                      <h2 className="font-semibold mb-2">Collaboration</h2>
                      <p>I Cultivate Positive Relationships .I am willing to learn from others</p>
                      <textarea
                        className="w-full h-24 border border-gray-300 rounded p-2 mt-2 resize-none "
                        placeholder="Type your answer here..."
                      ></textarea>
                    </div>

                    <div className="border rounded-lg shadow-lg p-4 mb-4 bg-white">
                      <h2 className="font-semibold mb-2">Collaboration</h2>
                      <p>I Cultivate Positive Relationships .I am willing to learn from others</p>
                      <textarea
                        className="w-full h-24 border border-gray-300 rounded p-2 mt-2 resize-none "
                        placeholder="Type your answer here..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="sticky bottom-0 bg-white py-4 flex justify-end space-x-2">
                    <button className="bg-orange-400 rounded-lg p-2 text-white px-4 mr-auto" onClick={handlePreviousForm}>Back</button>
                    {/* <button className="bg-orange-400 rounded-lg p-2 text-white px-4 py-2" onClick={handleSaveandexit}>Save & Exit</button> */}
                    <button className="bg-orange-400 rounded-lg p-2 text-white px-4 " onClick={handleSubmit}>Submit</button>
                  </div>
                </div>

              )}
            </>
          )}

      
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Do you want to submit your appraisal?</h2>
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={()=>handleConfirmSubmit()}
                >
                  Yes
                </button>
               
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={closeModal}  
                >
                  No
                </button>
              </div>
         
            </div>
      
          </div>
          
        )}


{isThankYouModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Thank you for your submission!</h2>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={closeThankYouModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
          
      </div>
    </div>
  );
};

export default EmpForm;