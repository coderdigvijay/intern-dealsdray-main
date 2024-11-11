const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
  
    if (error.name === "ZodError") {
      statusCode = 400;
      message = "Validation error";
    
      const zodErrors = JSON.parse(error.message);
      const errorMessages = zodErrors.map(error => error.message);
      return res.status(statusCode).json({ message, errors: errorMessages });
    }
  
    // Handle other types of errors
    if (error.name === "CastError" && error.kind === "ObjectId") {
      statusCode = 404; // Not Found
      message = "Resource not found";
    }
  
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  };
  
  
  export { notFound, errorHandler };
  