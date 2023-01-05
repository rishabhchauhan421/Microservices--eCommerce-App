import {ValidationError} from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError{
    
    statusCode = 400;
    errors: ValidationError[];

    constructor(errors:ValidationError[]){
        super('Invalid Request Param');
        this.errors = errors;

        //only because we are extending a builtin class 
        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }
    serializeError(): { message: string; field?: string | undefined; }[] {
        const formattedErrors = this.errors.map(error=>{
            return {message:error.msg, field:error.param};
        });
        return formattedErrors;
    }
}   

