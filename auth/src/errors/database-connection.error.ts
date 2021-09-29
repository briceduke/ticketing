import { ValidationError } from 'express-validator';

import { CustomError } from './custom-error.interface';

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Error connecting to database!';

	constructor(public errors: ValidationError[]) {
		super();

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
