const logger = require("../logger");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

const errorMiddleware = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      type: "about:blank",
      title: err.name.replace("Error", ""),
      status: err.statusCode,
      detail: err.message,
      instance: req.originalUrl,
    });
  }

  return res.status(500).json({
    type: "about:blank",
    title: "Internal Server Error",
    status: 500,
    detail: "An unexpected error occurred",
    instance: req.originalUrl,
  });
};

module.exports = { errorMiddleware, NotFoundError, ValidationError };
