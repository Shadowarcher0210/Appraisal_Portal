const mongoose = require('mongoose')
const Appraisal = require('../models/Appraisal');
const FormAnswers = require('../models/FormAnswers')
const User = require('../models/User')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())

const displayAppraisal = async(req, res) => {
    const { initiatedOn, managerName, depName, empScore, status } = req.body;

    try {
        const userId = req.userId;
        console.log("userid",userId)
        if (!userId) {
            return res.status(400).send({ error: 'User ID is required' });
        }
        const user = await User.findOne({ _id: userId }, { empName: 1 });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const formatDateOnly = (date) => {
            return new Date(date).toISOString().split('T')[0];
        };
        
        const startDate = formatDateOnly(initiatedOn);
        const endDate = formatDateOnly(new Date(initiatedOn).setFullYear(new Date(initiatedOn).getFullYear() + 1));
        const newForm = new Appraisal({
            userId,
            timePeriod: [startDate, endDate],
            initiatedOn: startDate,
            managerName,
            depName,
            empScore,
            status, 
        })

        const savedForm = await newForm.save(); 

        res.status(201).send({
            message: 'Appraisal form saved successfully!',
            // appraisalId: savedForm._id,
            userId: savedForm.userId, 
            empName: user.empName,  
            timePeriod: [startDate, endDate],
            initiatedOn: startDate,
            managerName,
            depName,
            empScore,
            status,
        })
    } catch (error) {
        console.log('Error saving appraisal form',error);
        res.status(500).send({
            success: false,
            error: error.message   
        });
    }
}

const saveAppraisalDetails = async (req, res) => {
        const { userId, startDate, endDate } = req.params;  
        const { pageData } = req.body;

        try {
            console.log("userid", userId);
            if (!userId) {
                return res.status(400).send({ error: 'User ID is required' });
            }

            if (!startDate || !endDate) {
                return res.status(400).send({ error: 'Both start and end dates are required in the time period.' });
            }

           
            const user = await User.findOne({ _id: userId }, { empName: 1 });
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            const updatedAppraisal = await Appraisal.findOneAndUpdate(
                { userId: new mongoose.Types.ObjectId(userId) }, // Filter by userId
                {pageData , status:'Submitted'},
                {new:true}
            )

            if (!updatedAppraisal) {
                return res.status(404).json({ message: 'Appraisal form not found.' });
            }

            res.status(201).send({
                message: 'Appraisal form saved successfully!',
               
                data: updatedAppraisal
            });
        } catch (error) {
            console.log('Error saving appraisal form', error);
            res.status(500).send({
                success: false,
                error: error.message
            });
        }
};

const updateAppraisalStatus = async (req, res) => {
    const { userId, startDate, endDate } = req.params; // Extract from route params
    const { status } = req.body; // Status from the request body
  
    try {
      if (!userId) {
        return res.status(400).send({ error: "User ID is required" });
      }
  
      if (!startDate || !endDate) {
        return res.status(400).send({ error: "A valid start and end date are required." });
      }
  
      const timePeriod = [new Date(startDate), new Date(endDate)];
  
      const validStatuses = ["To Do", "In Progress", "Submitted", "Under Review", "Completed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).send({ error: "Invalid status value provided" });
      }
  
      const appraisal = await Appraisal.findOneAndUpdate(
        {
          userId: userId,
          timePeriod: { $all: timePeriod },
        },
        { status: status }, 
        {
          new: true, 
          fields: {
            _id: 0,
            timePeriod: 1,
            initiatedOn: 1,
            managerName: 1,
            depName: 1,
            empScore: 1,
            status: 1,
          },
        }
      );
  
      if (!appraisal) {
        return res.status(404).json({
          message: "Appraisal not found for this employee and time period.",
        });
      }
  
      res.status(200).json({
        message: "Appraisal status updated successfully!",
        status: appraisal.status,
        timePeriod: appraisal.timePeriod,
        initiatedOn: appraisal.initiatedOn,
        managerName: appraisal.managerName,
        depName: appraisal.depName,
        empScore: appraisal.empScore,
        pageData: appraisal.pageData,
      });
    } catch (error) {
      console.error("Error updating appraisal status:", error);
      res.status(500).send({ error: "Error updating appraisal status" });
    }
  };
const getAppraisals = async (req, res) => {
    const { userId } = req.params; 
    try {
        const appraisals = await Appraisal.find({ userId: userId }, { timePeriod: 1, initiatedOn: 1, managerName: 1, depName: 1, empScore: 1, status: 1, _id: 0 });
        const user = await User.findOne({ _id: userId }, { empName: 1 });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        console.log('Retrieved Appraisals:', appraisals);

        if (appraisals.length === 0) {
            return res.status(404).json({ message: 'No appraisals found for this employee.' });
        }

        const isValidDate = (date) => {
            return date instanceof Date && !isNaN(date);
        };

        const formatDateOnly = (date) => {
            if (isValidDate(date)) {
                return date.toISOString().split('T')[0];
            }
            return null;
        };

        const responseData = appraisals.map(appraisal => ({
            empName: user.empName,
            timePeriod: Array.isArray(appraisal.timePeriod) ? appraisal.timePeriod.map(formatDateOnly) : [],
            initiatedOn: appraisal.initiatedOn ? formatDateOnly(new Date(appraisal.initiatedOn)) : null,
            managerName: appraisal.managerName,
            depName: appraisal.depName,
            empScore: appraisal.empScore,
            status: appraisal.status,
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching appraisals:', error);
        res.status(500).send('Error fetching appraisal data');
    }
};
const getAppraisalAnswers = async (req, res) => {
    const { userId, startDate, endDate } = req.params; 
    try {

        const timePeriod = [
            new Date(startDate).toISOString().split('T')[0], 
            new Date(endDate).toISOString().split('T')[0]
        ];

        const appraisalAnswers = await FormAnswers.find(
            { 
                userId: userId, 
                timePeriod: {
                    $gte: timePeriod[0], 
                    $lte: timePeriod[1]   
                }
             },
             { pageData:1, timePeriod:1, _id: 0 });
     
     
             console.log('Retrieved Appraisals Answers:', appraisalAnswers);


        if (appraisalAnswers.length === 0) {
            return res.status(404).json({ message: 'No appraisals found for this employee.' });
        }
        const responseData = appraisalAnswers.map(appraisal => ({
            pageData: appraisal.pageData
        }));
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching appraisals:', error);
        res.status(500).send('Error fetching appraisal data');
    }
};

//for performance tab
const getEmployeeAppraisal = async (req,res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findById(userId, '-password');
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

//create appraisal
    const createAppraisalForm = async (req,res)=>{
        try{
    const {userId ,managerName,timePeriod} = req.body;

    if(!userId || !timePeriod || !managerName){
        return res.status(400).json({message:'All required fiels must be provided.'})
    }
    const newAppraisal = new Appraisal({
        userId,
        timePeriod,
        initiatedOn: new Date(), 
        managerName,
        status: 'To Do',
        pageData: [],
    });
    const savedAppraisal = await newAppraisal.save();
    res.status(201).json({ message: 'Appraisal form created successfully', data: savedAppraisal });

        }catch(error){
    console.error('Error in creating appraisal form :',error);
    res.status(500).json({message:'Internal server error'})
        }
    }
    
const sendExpiringAppraisalNotification = async (req, res) => {
    const { userId, startDate } = req.params;
    
    try {
        // Validate and parse start date
        const startDateTime = new Date(startDate);
        
        if (isNaN(startDateTime.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Please use YYYY-MM-DD format'
            });
        }
        
        const endDateTime = new Date(startDateTime);
        endDateTime.setFullYear(endDateTime.getFullYear() + 1);
        
        startDateTime.setHours(0, 0, 0, 0);
        endDateTime.setHours(0, 0, 0, 0);
        
        const query = {
            userId: userId,
            $and: [
                { 'timePeriod.0': {
                    $gte: startDateTime,
                    $lte: new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000) // Include the entire day
                }},
                { 'timePeriod.1': {
                    $gte: endDateTime,
                    $lte: new Date(endDateTime.getTime() + 24 * 60 * 60 * 1000) // Include the entire day
                }}
            ]
        };
        
        console.log('Checking appraisal for userId:', userId, 'with start date:', startDate);
        console.log('Query:', JSON.stringify(query));
        
        const appraisal = await Appraisal.findOne(query).select({
            timePeriod: 1,
            userId: 1,
            status: 1,
            empScore: 1,
            managerName: 1
        });
        
        console.log('Found appraisal:', JSON.stringify(appraisal));
        
        if (!appraisal) {
            return res.status(404).json({
                success: false,
                message: `No appraisal found for this user starting from ${startDate}`
            });
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Get the end date from the timePeriod array (second element)
        const appraisalEndDate = new Date(appraisal.timePeriod[1]);
        const formattedEndDate = appraisalEndDate.toISOString().split('T')[0];
        
        const timeDifference = appraisalEndDate - today;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
        let message = null;
        if (daysRemaining <= 0) {
            message = `Your appraisal has expired. End date was: ${formattedEndDate}`;
        } else if (daysRemaining <= 10) {
            message = `Your appraisal expires within ${daysRemaining} days. End date: ${formattedEndDate}`;
        }
        
        return res.status(200).json({
            message: message,
        });
        
    } catch (error) {
        console.error('Error checking appraisal expiration:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'Error checking appraisal expiration',
            error: error.message
        });
    }
};

module.exports = {displayAppraisal, saveAppraisalDetails,updateAppraisalStatus, getAppraisals, getAppraisalAnswers, getEmployeeAppraisal,createAppraisalForm, sendExpiringAppraisalNotification}