const mongose = require('mongoose');

const TimePeriodSchema = new mongose.Schema(
    {
        timePeriod:{
            type:String,
            require:[true,'time period is required'],

        },
        Name:{
            type:String,
            require:[true,'user name is required'],
        },
        score:{
            type:String,
            require:[true,'score is required'],

        },
        status:{
            type:String,
            require:[true,'status is required'],

        },
    },{timestamps:true}
)

module.exports = mongose.model('user1',TimePeriodSchema);