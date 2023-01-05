import express from 'express';

const router = express.Router();

router.get('/api/users/signin',(req,res)=>{
    res.send('Hi Signin!!')
});

export {router as signinRouter};