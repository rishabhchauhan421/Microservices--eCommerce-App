import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500
    reason= 'Unable to connect to database';
    
    constructor(){
        super('DB Connection error');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError(): [{ message: string; field?: string }] {
        return [{message:this.reason}];
    }
    
}

