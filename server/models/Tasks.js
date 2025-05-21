const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titre: {type: String, required: true},
    status: {type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo'},
    assignee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});


module.exports = mongoose.model('Task', taskSchema);