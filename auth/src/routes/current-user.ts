import express from 'express';

const router = express.Router();

router.get('/api/users/currentusers',(req,res)=>{
    res.send('Hi There!!')
});

export {router as currentUserRouter};