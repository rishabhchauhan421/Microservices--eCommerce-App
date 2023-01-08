import { CustomError } from "./custom-error"


export class NotAuthorisedError extends CustomError{
    statusCode: number=401;

    constructor(){
        super('Not Authorised');
        Object.setPrototypeOf(this,NotAuthorisedError.prototype);
    }

    serializeError(): [{ message: string; field?: string }] {
        console.log('inside not authorised')
        return [{message:'Not Authorised'}];
    }

}