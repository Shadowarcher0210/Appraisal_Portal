import React from 'react';

const empView = () => {
 
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

  return (
    <div className="h-dvh ml-4 mt-16 w-11/12">
      {/* Header Section */}
      <h1 className="text-center font-bold text-3xl">Appraisal Details</h1>

      {/* Employee Basic Details */}
      <div className="ml-4 mr-4 mt-4 mb-4 border shadow-lg p-6 rounded-lg bg-white">
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

export default empView;