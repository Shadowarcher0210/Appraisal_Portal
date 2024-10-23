const Employee = require('../models/User');
const Appraisal = require('../models/Appraisal');

const getEmployeeAppraisal = async (req,res)=>{
    try{
        const {userId} = req.params;
        const user = await Employee.findById(userId, '-password');
        const statuses = ['Submitted','Under Review','Completed'];
        const appraisals = await Appraisal.find({
            userId,
            status: { $in: statuses },
            
          });
          if (!appraisals.length) {
            return res.status(404).json({ message: 'No appraisals found.' });
          }
      
          res.status(200).json(appraisals);
    }catch(error){
        console.error('Error fetching appraisals:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}
module.exports= {getEmployeeAppraisal}