import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  "Introduction",
  "Goals",
  "Self Appraisal",
  "Performance Improvement Plan",
  "Submit",
];



const EmpView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [weights, setWeights] = useState(Array(15).fill(0)); // State to hold weight values for each question

  // Function to update weight for a particular question
  const updateWeight = (index, percentage) => {
    const newWeights = [...weights];
    newWeights[index] = percentage;
    setWeights(newWeights);
  };

  const handleNextForm = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePreviousForm = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/employee-dashboard');
  };

const instructionsList =[
  'You fill your appraisal and submit to your manager.',
  'Your manager fills their comments and ratings for your appraisal and submits to HR.',
  'HR finalizes your appraisal.',
  'Your manager discusses the appraisal with you and Submits for your acceptance.',
  'You accept the appraisal to close the process for this year.',
]
const impInstructions =[
  ' It is mandatory to provide ratings and comments against all Competencies in the Competency Form and Goals in the Goal Sheet form. These ratings help you in defining your achievements as also help your manager in entering in ratings and comments while filling up your appraisal.',
  'As a good practice, go through all the forms and understand what data is required to be filled in. While you can complete the appraisal in multiple sittings, it may be a good idea to collect all the details prior to your starting to fill-in the forms.'
]
  return (
    <div className="flex h-screen ml-24 mt-16">
      <div className="w-48 h-full bg-gray-100 p-4 fixed">
        <h2 className="text-lg font-bold mb-6">Forms</h2>
        <ul>
          {TABS.map((tab, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
                  activeTab === index ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-8 ml-44">
        {/* <h1 className="text-2xl font-bold mb-4">{TABS[activeTab]}</h1> */}
        <div className="border p-4 rounded shadow-lg">
          {activeTab === 0 && ( <div>
            <div>
              <h1 className='font-bold text-center '> Performance Management Process </h1>

              <div>
                <h1> Instructions , steps and FAQs  </h1>
                <ul>
                  <li>This appraisal system allows you to provide your feedback and ratings against your performance targets. The following is the process of appraisal:</li>
                 {instructionsList.map((list,index)=>(
                  <li>
                     <span className="mr-2 text-sm">≫</span>
                     <span>{list}</span>
                  </li>
                 ))}
                </ul>
                <h1> Important Instructions </h1>
                <ul>
                    {impInstructions.map((list,index)=>(
                  <li>
                     <span className="mr-2 text-sm">≫</span>
                     <span>{list}</span>
                  </li>
                 ))}
                </ul>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-orange-400 text-white px-4 py-2 mr-auto " onClick={handleBack} >Back</button>      
  <button className="bg-orange-400 text-white px-4 py-2 "onClick={handleNextForm}>Next form</button>
  {/* <button className="bg-orange-400 text-white px-4 py-2">Done</button> */}
</div>
            </div>
            {/* <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
      <span className="text-4xl text-red-500">❗</span>
    </div> */}
                </div>)}
          {activeTab === 1 && <div>Content for Goals
            <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-orange-400 text-white px-4 py-2 mr-auto" onClick={handlePreviousForm}>Previous form</button>      
  <button className="bg-orange-400 text-white px-4 py-2" onClick={handleNextForm}>Next form</button>
  {/* <button className="bg-orange-400 text-white px-4 py-2">Done</button> */}
</div></div>}
          {activeTab === 2 && (
            <div>
              <div>
                <table className="border border-black w-full">
                  <thead className="border border-black">
                    <tr>
                      <th>Self-Assesment Areas</th>
                      <th>Strongly Disagree</th>
                      <th>Somewhat Disagree</th>
                      <th>Agree</th>
                      <th>Somewhat Agree</th>
                      <th>Strongly Agree</th>
                      <th>Notes</th>
                      <th>Weight</th>
                      <th>Attainment</th>
                      <th>Manager's Evaluation</th>
                    </tr>
                  </thead>
                  <tbody>
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
                        <td className="border p-2 text-wrap">
                          {text}
                        </td>
                        <td className="border">
                          <input
                          className='size-4'
                            type="radio"
                            name={`feedback-${index}`}
                            onChange={() => updateWeight(index, 20)}
                          />
                        </td>
                        <td className="border">
                          <input
                           className='size-4'
                            type="radio"
                            name={`feedback-${index}`}
                            onChange={() => updateWeight(index, 40)}
                          />
                        </td>
                        <td className="border">
                          <input
                           className='size-4'
                            type="radio"
                            name={`feedback-${index}`}
                            onChange={() => updateWeight(index, 60)}
                          />
                        </td>
                        <td className="border">
                          <input
                           className='size-4'
                            type="radio"
                            name={`feedback-${index}`}
                            onChange={() => updateWeight(index, 80)}
                          />
                        </td>
                        <td className="border">
                          <input
                           className='size-4'
                            type="radio"
                            name={`feedback-${index}`}
                            onChange={() => updateWeight(index, 100)}
                          />
                        </td>
                        <td className="border p-0   " style={{ padding: 0, cursor: 'text' }}>
                        <textarea
    className="w-full h-full outline-none border-none resize-none overflow-hidden"
    style={{ padding: '8px', border: 'none', outline: 'none', boxSizing: 'border-box' }}
  ></textarea>

                        </td>
                        <td className="border p-2">
                         
                        </td>
                        <td className="border text-center">{weights[index]}%</td>
                        
                        <td className="border p-2">
                         
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-orange-400 text-white px-4 py-2 mr-auto" onClick={handlePreviousForm}>Previous form</button>      
  <button className="bg-orange-400 text-white px-4 py-2" onClick={handleNextForm}>Next form</button>
  {/* <button className="bg-orange-400 text-white px-4 py-2">Done</button> */}
</div>
            </div>
          )}
          {activeTab === 3 && <div>Content for Performance Improvement Plan 
            <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-orange-400 text-white px-4 py-2 mr-auto" onClick={handlePreviousForm}>Previous form</button>      
  <button className="bg-orange-400 text-white px-4 py-2" onClick={handleNextForm}>Next form</button>
  {/* <button className="bg-orange-400 text-white px-4 py-2">Done</button> */}
</div></div>}
          {activeTab === 4 && <div>Content for Submit 
            <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-orange-400 text-white px-4 py-2 mr-auto" onClick={handlePreviousForm}>Previous form</button>            
  {/* <button className="bg-orange-400 text-white px-4 py-2" onClick={handleNextForm}>Next form</button> */}
  <button className="bg-orange-400 text-white px-4 py-2" >Done</button>
</div></div>}
        </div>
      </div>
    </div>
  );
};

export default EmpView;