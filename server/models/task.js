const mongoose = require('mongoose')

const taskSchemea = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchemea)

module.exports = Task