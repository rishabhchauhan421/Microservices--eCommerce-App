import {Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    console.log('Error: ',err.message)

    if(err instanceof CustomError){
        console.log(err.serializeError());
        return res.status(err.statusCode).send({errors:err.serializeError()});
    }

    res.status(400).send({
        errors:[{message:'Something went wrong'}]
    });
} 