const express = require("express"); 
const dotenv = require('dotenv'); 
const loginMiddleware = require('./middleware/loginMiddleware') 
const connectDB = require("./config/db");
const app = express(); 
const eventRoutes= require('./routes/eventRoutes')
const userRoutes= require('./routes/userRoutes');
dotenv.config(); 
connectDB();

app.use(express.json());
app.use('/api/events',loginMiddleware,eventRoutes);
app.use('/api/user',userRoutes);
const PORT = process.env.PORT||5000;
app.listen(PORT , console.log("Server Running on Port 5000"));