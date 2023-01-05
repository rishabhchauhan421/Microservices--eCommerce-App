import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { singupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { DatabaseConnectionError } from './errors/database-connection-error';

const app = express();
app.set('trus proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    secure:true
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(singupRouter);


app.all('*',()=>{
    throw new NotFoundError();
});

app.use(errorHandler);


start();
async function start(){
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{

        });
        
        console.log('connected to mongodb');
    }catch(err){
        console.error(err);
    }

    //Ports to listen
    app.listen(3000,()=>{
        console.log('Listening on port 3000')
    })
}