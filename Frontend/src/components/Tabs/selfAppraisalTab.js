// SelfAppraisalTab.js
import React from "react";

const SelfAppraisalTab = ({
  selfAppraisalPage,
  weights,
  notes,
  updateWeight,
  saveNotes,
  handlePreviousForm,
  handleContinue,
  questionsAndAnswers,
}) => {
    
  const questions = [
    "Job-Specific Knowledge: I possess and apply the expertise, experience, and background to achieve solid results.",
    "I work effectively and efficiently.",
    "Job-Specific Skills: I demonstrate the aptitude and competence to carry out my job responsibilities.",
    "Adaptability: I am flexible and receptive regarding new ideas and approaches.",
    "In response to the fluctuating demands of my job, I adapt easily to plans, goals, actions, and priorities.",
    "Collaboration: I cultivate positive relationships. I am willing to learn from others.",
    "Communication: I convey my thoughts clearly and respectfully.",
    "I demonstrate effective listening skills.",
    "Results: I identify goals that are aligned with the organization’s strategic direction and achieve results accordingly.",
    "I persist through significant difficulties to achieve those goals.",
    "Initiative: I anticipate needs, solve problems, and take action, all without explicit instructions.",
    "I take the initiative to discover new work challenges and to help shape events that will lead to the organization’s success.",
    "Development: I am committed to improving my knowledge and skills.",
    "Growth: I am proactive in identifying areas for self-development.",
  ];

  return (
    <div className="relative h-full flex flex-col">
      {selfAppraisalPage === 0 && (
        <>
          <h1 className="font-normal">
            Please select your response for self appraisal
          </h1>
          <table className="border border-gray-800 w-full mt-4 rounded-lg">
            <thead className="border border-blue-500  bg-blue-500 rounded-lg ">
              <tr className=" text-white font-medium  text-center text-md">
                <td className="border-r border-gray-800 ">
                  Self-Assesment Areas
                </td>
                <td className="border-r border-gray-800 p-2">
                  Strongly Disagree
                </td>
                <td className="border-r border-gray-800">Somewhat Disagree</td>
                <td className="border-r border-gray-800">Agree</td>
                <td className="border-r border-gray-800">Somewhat Agree</td>
                <td className="border-r border-gray-800">Strongly Agree</td>
                <td className="border-r border-gray-800">Notes</td>
                <td className="border-r border-gray-800">Weight</td>
                <td className="border-r border-gray-800">Attainment</td>
              </tr>
            </thead>
            <tbody>
              {questions.map((text, index) => (
                <tr key={`question-${index}`} className="text-center">
                  <td className="border p-2 border-gray-800 w-96">{text}</td>
                  <td className="border border-gray-800">
                    <input
                      className="size-4"
                      type="radio"
                      name={`feedback-${index}`}
                      onChange={() => updateWeight(index, 20)}
                    />
                  </td>
                  <td className="border border-gray-800 w-24">
                    <input
                      className="size-4"
                      type="radio"
                      name={`feedback-${index}`}
                      onChange={() => updateWeight(index, 40)}
                    />
                  </td>
                  <td className="border border-gray-800 w-24">
                    <input
                      className="size-4"
                      type="radio"
                      name={`feedback-${index}`}
                      onChange={() => updateWeight(index, 60)}
                    />
                  </td>
                  <td className="border border-gray-800">
                    <input
                      className="size-4"
                      type="radio"
                      name={`feedback-${index}`}
                      onChange={() => updateWeight(index, 80)}
                    />
                  </td>
                  <td className="border border-gray-800">
                    <input
                      className="size-4"
                      type="radio"
                      name={`feedback-${index}`}
                      onChange={() => updateWeight(index, 100)}
                    />
                  </td>
                  <td className="border p-0 border-gray-800 w-24">
                    <textarea
                      className="w-full  h-full outline-none border-none resize-none"
                      value={notes[index]}
                      onChange={(e) => saveNotes(index, e.target.value)}
                    ></textarea>
                  </td>
                  <td className="border p-2 border-gray-800 w-20"></td>
                  <td className="border p-2 border-gray-800">
                    {weights[index]}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sticky bottom-0 mt-8 bg-white py-4 flex justify-end space-x-2">
            <button
              className="bg-orange-400 hover:bg-orange-500 rounded-lg p-2 text-white px-4  mr-auto"
              onClick={handlePreviousForm}
            >
              Back
            </button>
            <button
              className="bg-orange-400  hover:bg-orange-500 rounded-lg p-2 text-white px-4"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </>
      )}
      {selfAppraisalPage === 1 && (
        <div className="relative h-full flex flex-col">
          <h1 className="font-semibold font-serif text-center text-2xl text-violet-800">
            Competencies
          </h1>

          <div className="mt-4 flex-1 overflow-y-auto">
            <div>
              {questionsAndAnswers.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-lg p-4 mb-4 bg-white"
                >
                  <h2 className="font-semibold mb-2">{item.question} </h2>
                  <p>{item.answer}</p>
                  <textarea
                    className="w-full h-24 border border-gray-300 rounded p-2 mt-2 resize-none"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white py-4 flex justify-end space-x-2">
            <button
              className="bg-orange-400  hover:bg-orange-500 rounded-lg p-2 text-white px-4 mr-auto"
              onClick={handlePreviousForm}
            >
              Back
            </button>
            <button
              className="bg-orange-400  hover:bg-orange-500 rounded-lg p-2 text-white px-4 "
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfAppraisalTab;