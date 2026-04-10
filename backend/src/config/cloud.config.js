const cloudinary = require("cloudinary") ;
const {CloudinaryStorage} = require("multer-storage-cloudinary") ;
const multer = require("multer") ;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET
}) ;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'civic_dev',
        allowed_formats:['jpg','png',"jpeh"],
    },
});

const upload = multer ({storage : storage}) ;
module.exports = upload ;

