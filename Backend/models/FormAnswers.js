const mongoose = require('mongoose')

const formAnswerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
        pageData: [{
            questionId: {
                type: String,
                required: true
            },
            answer: {
                type: String,
                required: true,
            },
            _id: false
        }]
    }
)

module.exports = mongoose.model('form',formAnswerSchema)
