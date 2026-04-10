const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try{
        const {
            username, email, password, phoneNnumber, gender, isAuthority } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User ({
                username,
                email,
                password: hashedPassword,
                phoneNnumber,
                gender,
                isAuthority
            });

            await newUser.save();
            res.status(201).send({ message: "user registered safely!", userId: newUser._id});
        } catch (err) {
            res.status(400).send({message: "Registration failed", error: err.message });
        }
    };

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        if(!user){
            return res.status(401).json({ message: "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password"});
        }
        res.status(200).json({
            message: "login successful!",
            user: {
                id: user._id.toString(),
                username: user.username,
                isAuthority: user.isAuthority,
                stars: user.stars
            }
        });
    } catch (err) {
        res.ststus(500).json({ message: "Login errror", error: err.message });
    }
};

const getUserprofile = async (req, res) => {
    try{
        const{id } = req.params;
        const user = await User.findById(id).select('-password');

        if(!user) {
            return res.status(404).json({message: "user not found"});
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ message : "Error fetching profile", error: err.message });
    }
};

const awardStar = async (req,res) => {
    try{
        const { id }= req.params;

        const updateUser = await User.findByIdAndUpdate(
            id,
            { $inc: {stars: 1 } },
            { new : true }
        ).select('-password');
        if(!updateUser){
            return res.status(404).json({message: "user not found"});
        }
        res.json({
            message: "Impact Point awarded!",
            stars: updateUser.stars
        });
    } catch (err) {
        console.error("Award Star Error:", err);
        res.status(500).json({message: "could not award star", error: err.message });
    }
};

const getUser = async(req,res) => {
    try{
        const users = await User.find({isAuthority:false})
            .select('username stars')
            .sort({stars: -1});
        
        res.json(users);
    } catch (err) {
        console.error("Fetch Users Error:", err);
        res.status(500).json({message: "Error fetching leaderboard data", error: err.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserprofile,
    awardStar,
    getUser,
};
