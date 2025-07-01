class CustomError extends Error {
    constructor(statusCode = 501, message = 'Something went worng!!') {
        super(message);
        this.statusCode = statusCode;

        // Capture stack trace (for debugging)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
