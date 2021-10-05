const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        minlength: [10, 'Enter a valid phone number'],
        maxlength: [10, 'Enter a valid phone number'],
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    currentStatus: {
        type: Boolean
    },
    checkIn: {
        type: Date,
        default: Date.now
    },
    checkOut: {
        type: Date,
        default: Date.now
    }
})

const Security = mongoose.model('Security', securitySchema);
module.exports = Security;