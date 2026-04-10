require('dotenv').config() ;
const mongoose = require("mongoose") ;
const express = require("express") ;
const cors = require('cors') ;


const app = express() ;
app.use(express.json()) ;
app.use(cors) ;


//db connection 

const MONGO_URI = process.env.MONGO_URI ;

const dbConnect = mongoose.connect(MONGO_URI)
.then(() => {
    console.log("connected to mongoDB ");
})
.catch((error)=>{
    console.error("Error connecting to mongodb",error) ;
}) ;


//routes 

//server connection 

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})