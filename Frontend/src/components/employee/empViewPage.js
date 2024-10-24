import {React, useState} from 'react';
import HelpPopup from '../PopupTemplate';
import band from "../../assets/band.png";

const EmpViewPage = () => {
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  // Static questions and answers
  const questionsAndAnswers = [
    { question: 'Adaptability', answer: 'I am very adaptable.' },
    { question: 'Collaboration', answer: 'I work well with others.' },
    { question: 'Problem Solving', answer: 'I solve problems efficiently.' },
    { question: 'Communication', answer: 'I communicate effectively.' },
    { question: 'Leadership', answer: 'I take initiative in team projects.' },
    { question: 'Technical Skills', answer: 'I excel at coding.' },
    { question: 'Time Management', answer: 'I manage time effectively.' },
    { question: 'Teamwork', answer: 'I value teamwork and cooperation.' },
    { question: 'Creativity', answer: 'I think outside the box.' },
    { question: 'Client Interaction', answer: 'I engage well with clients.' },
  ];
  const toggleHelpPopup = () => {
    setShowHelpPopup(!showHelpPopup);
  };

  return (
    <div className="h-dvh ml-10 mt-16 w-full mr-10">
        <div className="flex flex-row items-center justify-between relative mt-5 mb-4 bg-white border-zinc-900">
        <h1 className=" mt-8 text-2xl font-bold ">Appraisal Details</h1>

         
           <div className="top-buttons flex  z-10  absolute right-8 space-x-4 print:hidden">
           <HelpPopup />

            </div>
         </div>
      {/* <h1 className=" mt-8 text-2xl font-bold ">Appraisal Details</h1> */}
      <div className="bg-blue-50 w-64 rounded p-1.5 my-1 mt-6 mb-10">
                <p className=" text-sm text-black">
                  Your appraisal ID: 
                  {/* {applicationId?.substring(4)} */}
                </p>
           </div>
      <table className="w-full text-left mt-5 mb-4">
  <thead>
    <tr>
      <th className="w-1/5">
        <span className="flex gap-2 text-gray-500 text-md font-normal">
          <i className="fas fa-user  mt-1 mr-2"></i>
          Employee Name
        </span>
      </th>
      <th className="w-1/6">
        <span className="flex gap-2 text-gray-500 text-md font-normal">
          <img src={band} className='text-xs' style={{ width: '20px', height: '20px', filter: 'grayscale(100%)' }} alt='Band Icon' />
          Band
        </span>
      </th>
      <th className="w-1/5">
        <span className="flex gap-2 text-gray-500 text-md font-normal">
          <i className="fas fa-calendar-alt mt-1 mr-2"></i>
          Assessment Year
        </span>
      </th>
      <th className="w-1/5">
        <span className="flex gap-2 text-gray-500 text-md font-normal">
          <i className="fas fa-user mt-1 mr-2"></i>
          Manager Name
        </span>
      </th>
      <th className="w-1/5">
        <span className="flex gap-2 text-gray-500 text-md font-normal">
          <i className="fas fa-chart-line mt-1 mr-2"></i>
          Manager's Evaluation
        </span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {/* Add the actual data for each column here */}
      <td className="py-3">Employee Name Data</td>
      <td>Band Data</td>
      <td>Assessment Year Data</td>
      <td>Manager Name Data</td>
      <td>Manager's Evaluation Data</td>
    </tr>
  </tbody>
</table>


      {/* Employee Basic Details */}
      {/* <div className="ml-4 mr-4 mt-4 mb-4 border shadow-lg p-6 rounded-lg bg-white">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-2xl text-orange-600 font-semibold">Employee Name: </label>
              <span className="ml-2">Venkatesh Ganaparapu</span>
            </div>
            <div>
              <label className="text-2xl text-orange-600 font-semibold">Band: </label>
              <span className="ml-2">B2/2</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <label className="text-2xl text-orange-600 font-semibold">Assessment Year: </label>
              <span className="ml-2">2024-04-01 to 2025-03-31</span>
            </div>
            <div>
              <label className="text-2xl text-orange-600 font-semibold">Manager Name: </label>
              <span className="ml-2">Tejaswi Peesapati</span>
            </div>
          </div>

          <div>
            <label className="text-2xl text-orange-600 font-semibold">Manager's Evaluation: </label>
            <span className="ml-2">60%</span>
          </div>
        </div>
      </div> */}


<div className="bg-highlight rounded-md  ">
  <p className="font-semibold text-headerbg text-lg mb-4">Self-Appraisal Responses</p>
  <div className="overflow-hidden border mr-20 border-gray-300 rounded-lg">
    <table className="table-auto w-full">
      <tbody>
        {questionsAndAnswers.map((item, index) => (
          <tr key={index}>
            <td className="p-2 w-1/2 border-b border-gray-300">
              <p className="font-normal p-2">
                {item.question}
              </p>
            </td>
            <td className="border-b border-gray-300">
              <p className="w-1/2 ml-8 font-normal">
                {item.answer}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      {/* Questions and Answers Section */}

      <div className="ml-4 mr-4 mt-4 mb-4 border shadow-lg p-6 rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Self-Appraisal Responses</h2>
        {questionsAndAnswers.map((item, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <p className="text-lg font-medium text-blue-600">{item.question}</p>
            <p className="text-gray-700">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpViewPage;