require('dotenv').config() ;
const mongoose = require("mongoose") ;

const express = require("express") ;


const app = express() ;





//db connection 

const MONGO_URI = process.env.MONGO_URI ;

const dbConnect = mongoose.connect(MONGO_URI)
.then(() => {
    console.log("connected to mongoDB ");
})
.catch((error)=>{
    console.error("Error connecting to mongodb",error) ;
})

//server connection 

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})