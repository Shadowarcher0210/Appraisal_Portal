const TimePeriodModel = require("../models/TimePeriod");

const timePeriod = async(req,res)=>{
    const {startDate,endDate} = req.query;
    try {
        const appraisals = await TimePeriodModel.find({
            appraisalDate:{
                $gte:new Date(startDate),
                $lte: new Date(endDate)
            }
        });
        if(!appraisals.length){
            return res.status(404).send({
                success:false,
                message:'No appraisals found within this date range'
            })

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in TimePeriod Api',
            error
            
        })

        
    }
}
module.exports = {timePeriod};