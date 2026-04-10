const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    getUserProfile,
    awardStar,
    getUsers 
} = require('../controllers/user.controller');

// LeaderboardModal 
router.get('/', getUsers);

// Path: /api/users/signup
router.post('/signup', registerUser);

// Path: /api/users/login
router.post('/login', loginUser);

// Path: /api/users/profile/:id
router.get('/profile/:id', getUserProfile);

// reward citizens for helpful reports
router.patch('/:id/award-star', awardStar);

module.exports = router;