const Complaint = require('../models/Complaint.model');

const createComplaint = async(req, res) => {
    try{
        const imageURL = req.file ? req.file.path : req.body.image;

        let parsedLocation = req.body.location;
        if(typeof parsedLocation === 'string'){
            parsedLocation = JSON.parse(parsedLocation);
        }

        const userId = (req.body.user === "null" || req.body.user === "undefined" || !req.body.user) ? null :
        req.body.user;

        const newComplaint = new Complaint({
            title: req.body.title,
            description: req.body.description,
            image: imageURL,
            location: {
                lat: parsedLocation.lat ,
                lng: parsedLocation.lng,
                address: parsedLocation.address || "jamshedpur"
            },
            
            status : req.body.status || "Pending" ,
            userType : userId ? "User" : "Guest" ,
            user : userId
        });

        await newComplaint.save(); 
        res.status(201).send({message : "Complaint Sent Successfully" , data : newComplaint}) ;
    }catch(err){
        console.error("Backend error : ",err);
        res.status(500).send({message: "Error Sending Complaint " , error: err.message}) ;
    }
};

const resolveComplaint = async (req,res) => {
    try {
        const {id} = req.params ;
        const resolvedImageUrl = req.file ? req.file.path : null ;
        if(!resolvedImageUrl){
            return res.status(400).json({message:"Peoof Of Resolution Is Required"}) ;
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            {
                status:"Resoled",
                resolvedImage:resolvedImageUrl,
                resolvedAt:Date.now() 
            },
            {new : true}
        );

        if(!updatedComplaint){
            return res.status(404).json({message: "Complaint not Found"}) ;
        }

        res.json({message: "issue marked as Resolved !",data: updatedComplaint}) ;
    } catch (err) {
        res.status(500).json({message : "Resolution Failed",error: err.message}) ;
    }
} ;


const getComplaintById = async (req,res) => {
    try {
        const {id} = req.params ;
        const complaint = await Complaint.findById(id).populate("user","username stars") ;
        if(!complaint){
            return res.status(404).json({message:"Complaint Not Found"}) ;
        }

        res.send(complaint);
    } catch (err) {
        res.status(500).send({message : "Error Fetching the Complaint",error : err})
    }
};


const updateComplaintStatus = async (req,res) => {
    try {
        
        const {id} = req.params ;
        const {status} = req.body ;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            {status:status},
            {new : true}
        ) ;
        if(!updatedComplaint){
            return res.status(404).json({message : "Complaint not found "}) ;
        }
        res,json({message:"Status updated!", data : updatedComplaint}) ;
    } catch (err) {
        res.status(500).json({message: "Update Failed",error:err.message}) ;
    }
} ;

const getComplaints = async (req , res) =>{
    try {
        const allComplaints = (await Complaint.find().populate("user","username stars")).toSorted({createdAt:-1}) ;
    } catch (err) {
        res.status(500).send({message:"Error Fetching Complaints", errro : err})
    }
};

module.exports = {
    createComplaint,
    resolveComplaint ,
    getComplaints,
    getComplaintById,
    updateComplaintStatus
};