// middlewares/errorHandler.js

import CustomError from '../utils/customError.js';

const errorHandler = (err, req, res, next) => {
 const statusCode = err.statusCode || 500;
  if (err instanceof CustomError) {
    res.status(statusCode).json({
      success: false,
      message: err.message
    });
  } else {
    console.log(err); // Log unexpected errors
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export default errorHandler;
