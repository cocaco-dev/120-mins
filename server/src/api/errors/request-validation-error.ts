import { ValidationError} from 'express-validator';

import {CustomError} from './custom-error'
export class RequestValidationError extends CustomError {
    statusCode = 400;
    errors: ValidationError[];
    constructor(errorIn: ValidationError[]) {  
        super('invalid parameters');
        this.errors = errorIn
        // only because we are extending a built in class
        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            let helper = <string>err.msg.toString()
            return { message: helper, field: err.param}
        })
    }
}

