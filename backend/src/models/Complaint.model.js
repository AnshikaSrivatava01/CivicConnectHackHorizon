const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [type, 'Please add a title'],
        trim: true 
    },
    description: {
        type: String,
        required: [true, 'Please add a detailed description']
    },
    image: {
        type: String,
        required: [true, ' An image is required'],
        default: 'https://images.unsplash.com/photo-1569060368681-889a62a8f416?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    resolvedImage: {
        type: String,
        default: null
    },
    location: {
        lat: {type: Number, required:true },
        lng: {type: Number, required: true},
        address: String
    },
    status: {
        type: String,
        enum: ['pending', 'In progress', 'resolved'],
        default: 'pending'
    },
    userType: {
        type: String,
        enum: ['User','Guest'],
        default: 'Guest'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    resolvedAt: {
        type: Date,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Complaint', ComplaintSchema);