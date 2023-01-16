import express, {Request,Response} from 'express';
import {body} from 'express-validator'
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import {BadRequestError, validateRequest} from '@rishabhtickets/common';

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Password must be between 4 & 20 sec')
],validateRequest, async (req: Request,res: Response)=>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    
    if(existingUser){
        console.log('Email is already in Use');
        throw new BadRequestError('Email is already in use');
    }

    const user = User.build({email, password});
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
    },process.env.JWT_KEY!
    );
  
    // Store it on session object
    req.session = {
    jwt: userJwt,
    };
    
    res.status(201).send(user);

});

export {router as singupRouter};