const Appraisal = require('../models/Appraisal');
const User = require('../models/User')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())

const saveAppraisal = async(req, res) => {
    const { initiatedOn, managerName, depName, empScore, status, pageData } = req.body;

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
            pageData: pageData.map(({ questionId, questionText, answer }) => ({
                questionId,
                answer,
                ...(questionText && { questionText })  
            }))
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
            pageData: savedForm.pageData
        })
    } catch (error) {
        console.log('Error saving appraisal form',error);
        res.status(500).send({
            success: false,
            error: error.message   
        });
    }
}


const getAppraisals = async (req, res) => {
    const { userId } = req.params; 
    try {
        const appraisals = await Appraisal.find({ userId: userId }, { timePeriod: 1, initiatedOn: 1, managerName: 1, depName: 1, empScore: 1, status: 1, pageData: 1, _id: 0 });
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
            pageData: appraisal.pageData,
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching appraisals:', error);
        res.status(500).send('Error fetching appraisal data');
    }
};


//const answerOptions = ["strongly disagree", "somewhat disagree", "agree", "somewhat agree", "strongly agree"];

// const saveAppraisal = async (req, res) => {
//     const { initiatedOn, managerName, depName, empScore, status, pageData } = req.body;

//     try {
//         const userId = req.userId;
//         if (!userId) {
//             return res.status(400).send({ error: 'User ID is required' });
//         }

//         const user = await User.findOne({ _id: userId }, { empName: 1 });
//         if (!user) {
//             return res.status(404).send({ error: 'User not found' });
//         }

//         // Function to format the date
//         const formatDateOnly = (date) => new Date(date).toISOString().split('T')[0];

//         const startDate = formatDateOnly(initiatedOn);
//         const endDate = formatDateOnly(new Date(initiatedOn).setFullYear(new Date(initiatedOn).getFullYear() + 1));

//         // Validate answers
//         const isValidAnswer = (answer) => answerOptions.includes(answer);
//         for (let i = 0; i < pageData.length; i++) {
//             if (!isValidAnswer(pageData[i].answer)) {
//                 return res.status(400).send({
//                     error: `Invalid answer provided for questionId ${pageData[i].questionId}. Answer must be one of: ${answerOptions.join(", ")}`
//                 });
//             }
//         }

//         // Create new appraisal form
//         const newForm = new Appraisal({
//             userId,
//             timePeriod: [startDate, endDate],
//             initiatedOn: startDate,
//             managerName,
//             depName,
//             empScore,
//             status, 
//             pageData: pageData.map(({ questionId, questionText, answer }) => ({
//                 questionId,
//                 answer,
//                 ...(questionText && { questionText })  // Include questionText only if it exists
//             }))
//         });

//         const savedForm = await newForm.save();

//         res.status(201).send({
//             message: 'Appraisal form saved successfully!',
//             userId: savedForm.userId, 
//             empName: user.empName,
//             timePeriod: [startDate, endDate],
//             initiatedOn: startDate,
//             managerName,
//             depName,
//             empScore,
//             status,
//             pageData: savedForm.pageData
//         });
//     } catch (error) {
//         console.log('Error saving appraisal form', error);
//         res.status(500).send({
//             success: false,
//             error: error.message   
//         });
//     }
// };

module.exports = {saveAppraisal, getAppraisals}