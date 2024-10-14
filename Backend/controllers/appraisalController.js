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
            pageData
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
            pageData      
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
        const appraisal = await Appraisal.findOne({ userId: userId }, { timePeriod:1,initiatedOn:1,managerName:1,depName:1, empScore:1,status:1, pageData: 1, _id: 0 });
        const user = await User.findOne({ _id: userId }, { empName: 1 });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!appraisal) {
            return res.status(404).json({ message: 'Appraisal not found for this employee.' });
        }
        const formatDateOnly = (date) => {
            return new Date(date).toISOString().split('T')[0];
        };
        const responseData = {
            empName: user.empName,
            timePeriod: appraisal.timePeriod.map(formatDateOnly),
            initiatedOn: formatDateOnly(appraisal.initiatedOn),         
            managerName: appraisal.managerName,
            depName: appraisal.depName,
            empScore: appraisal.empScore,
            status: appraisal.status,
            pageData: appraisal.pageData,
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching page data:', error);
        res.status(500).send('Error fetching pag e data');
    }
};

module.exports = {saveAppraisal, getAppraisals}