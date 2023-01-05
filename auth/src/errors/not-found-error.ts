import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
    statusCode = 404;
    reason= 'Not found';
    
    constructor(){
        super('Route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(): [{ message: string; field?: string }] {
        return [{message:this.reason}];
    }
    
}

