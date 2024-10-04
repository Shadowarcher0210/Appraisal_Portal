import React, { useState, useEffect } from 'react';

// Sample application data
const applications = [
  { id: 1, name: 'App 1', createdDate: '2022-06-15' }, // 2022-2023 academic year
  { id: 2, name: 'App 2', createdDate: '2023-01-30' }, // 2022-2023 academic year
  { id: 3, name: 'App 3', createdDate: '2023-04-10' }, // 2023-2024 academic year
  { id: 4, name: 'App 4', createdDate: '2024-02-20' }, // 2023-2024 academic year
  { id: 5, name: 'App 5', createdDate: '2024-04-05' }, // 2024-2025 academic year
];

// Utility function to get the start and end dates for a given academic year
const getAcademicYearRange = (year) => {
  const start = new Date(year, 3, 1); // April 1st of the given year
  const end = new Date(year + 1, 2, 31, 23, 59, 59); // March 31st of the next year, 23:59:59
  return { start, end };
};

const PerformancePage = () => {
  const [filteredApps, setFilteredApps] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    // Generate academic year options dynamically based on current year
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3; // Display last 3 academic years as options
    const years = [];

    for (let i = startYear; i <= currentYear; i++) {
      years.push(`${i}-${i + 1}`);
    }
    setAcademicYears(years);

    // Set default selected year to the current academic year
    const defaultYear = currentYear - (new Date().getMonth() < 3 ? 1 : 0); // Adjust based on the current month
    setSelectedYear(`${defaultYear}-${defaultYear + 1}`);
  }, []);

  useEffect(() => {
    if (selectedYear) {
      // Parse the start year from the selected academic year (e.g., "2023-2024")
      const startYear = parseInt(selectedYear.split('-')[0], 10);
      const { start, end } = getAcademicYearRange(startYear);

      // Filter applications based on the selected academic year
      const filtered = applications.filter((app) => {
        const appDate = new Date(app.createdDate);
        return appDate >= start && appDate <= end;
      });

      setFilteredApps(filtered);
    }
  }, [selectedYear]);

  return (
    <div className='ml-28 mt-20 '>
    <div>
      <div>
        <label className='border-black border-1 rounded-full py-1 px-9 bg-slate-100'>
       <label htmlFor="time-period" className=''>Time Period : </label>
      <select
        id="time-period"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {academicYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      </label>
      
<br></br>
<hr></hr>   
<br></br>   
<div>
  <h2 className='font-bold'>Appraisal</h2>
  <text>Your performance appraisals for the selected time period are displayed below. Click on the View or edit appraisal button to complete your self appraisal (if applicable) or view the ratings given by your manager (once ready to be viewed)</text>
      <table>
        <thead>
          <tr>
<th>Time Period</th>
<th>Manager</th>
<th>Status</th>
<th>Actions</th>
          </tr>
          </thead>
          <tbody>

          </tbody>
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <li key={app.id}>
              {app.name} - {app.createdDate}
            </li>
          ))
        ) : (
          <li>No applications found for the selected academic year.</li>
        )}
      </table>
      </div>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
    </div>
    </div>
  );
};

export default PerformancePage;
