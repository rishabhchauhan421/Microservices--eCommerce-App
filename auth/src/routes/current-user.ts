import express from 'express';
import { User } from '../models/user';
import  jwt from 'jsonwebtoken';
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser,(req,res)=>{
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter}; 