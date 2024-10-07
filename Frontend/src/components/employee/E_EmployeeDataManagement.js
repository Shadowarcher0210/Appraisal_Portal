import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const E_EmployeeDataManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [kpiRows, setKpiRows] = useState([{ kpi: '', measures: '', date: new Date(), comment: '' }]);
  const [goals, setGoals] = useState([]);

  const handleAddGoalClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {

    setGoals(kpiRows);
    setIsPopupOpen(false);
  };

  const handleDateChange = (index, date) => {
    const updatedRows = [...kpiRows];
    updatedRows[index].date = date;
    setKpiRows(updatedRows);
  };

  const handleCommentChange = (index, comment) => {
    const updatedRows = [...kpiRows];
    updatedRows[index].comment = comment;
    setKpiRows(updatedRows);
  };

  const handleMeasuresChange = (index, measures) => {
    const updatedRows = [...kpiRows];
    updatedRows[index].measures = measures;
    setKpiRows(updatedRows);
  };

  const handleKpiChange = (index, kpi) => {
    const updatedRows = [...kpiRows];
    updatedRows[index].kpi = kpi;
    setKpiRows(updatedRows);
  };

  const handleAddRow = () => {
    setKpiRows([...kpiRows, { kpi: '', measures: '', date: new Date(), comment: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = kpiRows.filter((_, i) => i !== index);
    setKpiRows(updatedRows);
  };

  const handleEditRow = (index) => {

    console.log('Edit row', index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <div className="flex-1 flex flex-col items-center p-4 mt-16 ml-24">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl border border-gray-300 mb-8">
          <h1 className="text-2xl font-bold mb-4">Reports</h1>
          <p className="mb-4">
            View the following reports in full data and dashboards for informed decision making. Eg. The cross tab reports for competencies display all competencies on the same page with employee and manager ratings and comments.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Employee Status Details
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              Appraisal Calculated Final Score
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300">
              Appraisal Attribute Final Ratings
            </button>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl border border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Goal Library</h1>
          <p className="mb-4">
            Employee goals are defined at various levels: company goals, department goals, and job goals. HR can create and modify the goal library, and control goal visibility for employees, managers, and the leadership.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddGoalClick}
          >
            Add Goal
          </button>

          <div className="mt-4">
            {goals.length > 0 ? (
              <ul>
                {goals.map((goal, index) => (
                  <li key={index} className="bg-gray-100 p-4 mb-2 rounded-md border border-gray-300">
                    <h3 className="text-lg font-semibold">{goal.kpi}</h3>
                    <p><strong>Measures:</strong> {goal.measures}</p>
                    <p><strong>Date:</strong> {goal.date.toDateString()}</p>
                    <p><strong>Comment:</strong> {goal.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No goals added yet.</p>
            )}
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-6xl h-3/4 max-h-3/4 border border-gray-300 flex flex-col">

            <h1 className="text-2xl font-bold bg-white p-4 border-b border-gray-300 sticky top-0 z-10">Add Goal</h1>
            <div className="flex-1 overflow-auto mt-4">
              <p className="mb-4">
                You can add or edit a global goal and set up the goal attributes here. Apply the goal to a specific group of employees or all employees, and once the selected employees create their goalsheet, this goal will be added automatically to their goalsheet. Employees can also view all goals and import them into their goalsheet.
              </p>
              <h3 className="text-xl font-semibold mb-2">Statement</h3>
              <textarea
                placeholder="Enter Goal Statement"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                rows="4"
              />
              <h3 className="text-xl font-semibold mb-2">Applies To:</h3>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input type="radio" name="appliesTo" value="All Employees" className="mr-2" />
                  All Employees
                </label>
                <label className="flex items-center">
                  <input type="radio" name="appliesTo" value="Group" className="mr-2" />
                  Group
                </label>
                <label className="flex items-center">
                  <input type="radio" name="appliesTo" value="Specific Employee" className="mr-2" />
                  Specific Employee
                </label>
              </div>
              <div className="overflow-auto max-h-full mb-4">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">KPI</th>
                      <th className="border border-gray-300 p-2">Measures</th>
                      <th className="border border-gray-300 p-2">Expected Completion Date</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiRows.map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={row.kpi}
                            onChange={(e) => handleKpiChange(index, e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                            rows="2"
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <textarea
                            value={row.measures}
                            onChange={(e) => handleMeasuresChange(index, e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                            rows="2"
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <DatePicker
                            selected={row.date}
                            onChange={(date) => handleDateChange(index, date)}
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors duration-300 mr-2"
                            onClick={() => handleEditRow(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
                            onClick={() => handleDeleteRow(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4"
                  onClick={handleAddRow}
                >
                  Add Row
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4 bg-white border-t border-gray-300 p-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                onClick={handleClosePopup}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default E_EmployeeDataManagement;
