const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    getUserProfile,
    awardStar,
    getUsers 
} = require('../controllers/user.controller');

//path: /api/users/ 
router.get('/', getUsers); // to get all user for leader board for gamification 

// Path: /api/users/signup
router.post('/signup', registerUser);

// Path: /api/users/login
router.post('/login', loginUser);

// Path: /api/users/profile/:id
router.get('/profile/:id', getUserProfile);


router.patch('/:id/award-star', awardStar);

module.exports = router;