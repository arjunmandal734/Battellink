import express from 'express';


import { createContest,deleteContest, updateContest, updatePlayerProfile } from '../controllers/adminControllers.js';


const router = express.Router();

// Admin can create contests
router.post('/createContest', createContest);

// Admin can delete contests
router.post('/deleteContest', deleteContest);


// Admin can update contests
router.post('/updateContest', updateContest);


// Admin can update player profiles
router.put('/updatePlayerProfile/:playerId', updatePlayerProfile);


export default router;
