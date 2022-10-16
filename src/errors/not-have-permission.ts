import { CustomError } from "./custom-error";

export class NotHavePermissionError extends CustomError {
  statusCode = 403;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotHavePermissionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
