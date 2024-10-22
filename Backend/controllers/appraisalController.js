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

            const timePeriod = [
                new Date(startDate).toISOString().split('T')[0], 
                new Date(endDate).toISOString().split('T')[0]
            ];
            const user = await User.findOne({ _id: userId }, { empName: 1 });
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            const saveForm = new FormAnswers({
                userId,
                pageData: pageData.map(({ questionId, answer , notes }) => ({
                    questionId,
                    answer,
                    notes
                })),
                timePeriod 
            });

            const savedForm = await saveForm.save();

            res.status(201).send({
                message: 'Appraisal form saved successfully!',
                userId: savedForm.userId,
                pageData: savedForm.pageData,
                notes:savedForm.notes,
                timePeriod: savedForm.timePeriod
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

module.exports = {displayAppraisal, saveAppraisalDetails,updateAppraisalStatus, getAppraisals}