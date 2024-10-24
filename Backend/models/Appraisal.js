const mongoose = require('mongoose');

const pageDataSchema = new mongoose.Schema(
    {
        questionId: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        notes: {
            type: String,
            default: ""
        }
    },
    { _id: false } // Prevents creating an automatic _id for each entry
);

const appraisalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timePeriod: {
        type: [Date], // Array of two dates (start and end)
        validate: {
            validator: function (v) {
                return v.length === 2; // Ensures exactly two dates are provided
            },
            message: 'Time period must contain exactly two dates (start and end).'
        }
    },
    initiatedOn: {
        type: Date,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Submitted", "Under Review", "Completed"],
        default: "To Do",
        required: true
    },
    pageData: {
        type: [pageDataSchema], // Array of objects following the pageDataSchema
        default: [] // Allows empty array initially
    }
});

module.exports = mongoose.model('Appraisal', appraisalSchema);