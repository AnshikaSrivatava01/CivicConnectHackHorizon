require('dotenv').config() ;
const mongoose = require("mongoose") ;
const express = require("express") ;
const cors = require('cors') ;
const complaintRoutes = require('./routes/complaint.routes');
const userRoutes = require('./routes/user.routes');
const authorityRoutes = require('./routes/authority.routes');
const aiRoutes = require('./routes/ai.routes');


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


// Routes and api endpoints

// all complaint URLs will start with /api/complaints
app.use('/api/complaints', complaintRoutes);
// All user URLs will start with /api/users
app.use('/api/users', userRoutes);
// All authority URLs will start with /api/authority
app.use('/api/authority', authorityRoutes);
// All AI-related URLs will start with /api/ai
app.use('/api/ai', aiRoutes);


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

//server connection 

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})