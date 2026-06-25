const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    phone: {
        type: Number,
        pattern: '0[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
        required: [true, "Phone number is required"]
    },

    department: {
        type: String,
        required: [true, "Department is required!"]
    },

    role: {
        type: String,
        required: [true, "Worker must have a role."]
    }
}, {timestamps: true}

);

const Worker = mongoose.model('workers',WorkerSchema);

module.exports = Worker;