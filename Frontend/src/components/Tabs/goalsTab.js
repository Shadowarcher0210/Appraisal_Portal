// GoalsTab.js
import React from 'react';

const GoalsTab = ({ goalsResponse, handlePreviousForm, handleSubmit }) => {
  return (
    <div className="relative h-full flex flex-col overflow-y-auto max-h-[550px] scroll-th">
      <h1 className="font-semibold font-serif text-center text-2xl text-violet-800">
        Goals
      </h1>
      <div className="mt-4 flex-1 ">
        <div>
          {goalsResponse.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg p-4 mb-4 bg-white"
            >
              <h2 className="font-semibold mb-2">{item.question}</h2>
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
          className="bg-orange-400 hover:bg-orange-500 rounded-lg p-2 text-white px-4 mr-auto"
          onClick={handlePreviousForm}
        >
          Back
        </button>
        <button
          className="bg-orange-400 hover:bg-orange-500 rounded-lg p-2 text-white px-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GoalsTab;