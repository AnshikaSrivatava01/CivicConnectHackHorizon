const mongoose = require('mongoose');

const AuthoritySchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Official email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Contact number is required']
    },
    // Professional fields ( " The proof")
    organisation: {
        type: String,
        required: [true, 'Organisation name (e.g., JMC) is required']
    },
    designation: {
        type: String,
        required: [true, 'Job title/ Designation is required']
    },
    idproofNumber: {
        type: String,
        required: [ttrue, 'Government ID or Employee ID is required'],
        unique: true
    },

    // Role logic 
    isAuthority: {
        type : Boolean,
        default: true
    }
},{ 
    timestamps:  true // Trtack when the  offiser joined the platform
});
module.exports = mongoose.model('Authority', AuthoritySchema);