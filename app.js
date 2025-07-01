import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

// Import Middlewares
import errorHandler from './middlewares/errorHandler.js';

// Import Routers
import userRouter from './Routes/userRoutes.js';
import profileRouter from './Routes/profileRoutes.js'; 


//  Creating server
const app = express();

// Use middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());


//  Use API Routes 
app.use("/api/v1/user", userRouter);

app.use('/api/v1/profile', profileRouter);

//app.use("/api/v1/contest", contestroute);


// Use Web Page Loding Routes


// Error-handling middleware 
app.use(errorHandler);

// Exporting app
export default app;