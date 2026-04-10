const express = require('express');
const router = express.Router();
const upload = require('../config/cloud.config');

const { 
    createComplaint, 
    getComplaints, 
    getComplaintById, 
    updateComplaintStatus,
    resolveComplaint 
} = require('../controllers/complaint.controller');

// Guest Routes 

// GET all reports & POST new report (with 'Before' image)
router.get('/', getComplaints);
router.post('/', upload.single('image'), createComplaint);

// GET specific report details
router.get('/:id', getComplaintById);


// --- Authority Specific Routes ---

// 1. Status Update 
router.patch('/:id/status', updateComplaintStatus);

// 2. Full Resolution Update (with 'After' image)
router.patch('/:id/resolve', upload.single('image'), resolveComplaint);


module.exports = router;