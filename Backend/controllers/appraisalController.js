const Appraisal = require('../models/Appraisal');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const saveAppraisal = async(req, res) => {
    const { initiatedOn, managerName, empScore, status, pageData } = req.body;

    try {
        const userId = req.userId;
        console.log("userid",userId)
        if (!userId) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        const startDate = new Date(initiatedOn)
        const endDate = new Date(startDate)
        endDate.setFullYear(startDate.getFullYear()+1)
        const newForm = new Appraisal({
            userId,
            timePeriod: [startDate, endDate],
            initiatedOn: startDate,
            managerName,
            empScore,
            status, 
            pageData
        })
        const savedForm = await newForm.save(); 
        res.status(201).send({
            message: 'Appraisal form saved successfully!',
            appraisalId: savedForm._id,
            userId: savedForm.userId        
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
        const appraisal = await Appraisal.findOne({ userId: userId }, { pageData: 1, _id: 0 });
        if (!appraisal) {
            return res.status(404).json({ message: 'Appraisal not found for this employee.' });
        }
        res.status(200).json(appraisal.pageData);
    } catch (error) {
        console.error('Error fetching page data:', error);
        res.status(500).send('Error fetching page data');
    }
};

module.exports = {saveAppraisal, getAppraisals}