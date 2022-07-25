class ErrorHandler {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode: number = 400, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ErrorHandler;
