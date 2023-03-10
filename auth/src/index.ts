import mongoose from 'mongoose';
import {app} from './app';

start();
async function start(){
    if(!process.env.JWT_KEY){
        throw new Error('JWT must be defined');
    }
    
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