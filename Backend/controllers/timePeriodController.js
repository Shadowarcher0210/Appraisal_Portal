const Appraisal = require('../models/Appraisal');

// Get users by date of joining between startDate and endDate
const getAppraisalsByDateRange = async (req, res) => {
    const { startDate, endDate } = req.body;
  
    try {
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required' });
      }
  
      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();
  
      const appraisals = await Appraisal.aggregate([
        {
            $project: {
              empName: 1,
              timePeriodStartYear: { $year: { $arrayElemAt: ['$timePeriod', 0] } }, // Extract year from start date
              timePeriodEndYear: { $year: { $arrayElemAt: ['$timePeriod', 1] } },   // Extract year from end date
              timePeriod: 1, // Include the full timePeriod for reference
              managerName: 1,
            //   depName: 1,
              empScore: 1,
              status: 1,
            },
          },
          {
            $match: {
              timePeriodStartYear: { $gte: startYear, $lte: endYear }, // Start date within range
              timePeriodEndYear: { $gte: startYear, $lte: endYear },   // End date within range
            },
          },
        ]);
      if (appraisals.length === 0) {
        return res.status(404).json({ message: 'No appraisals found in the specified date range' });
      }
  
      res.status(200).json(appraisals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
 module.exports ={getAppraisalsByDateRange};
