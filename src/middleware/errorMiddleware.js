const logger = require("../logger");

const errorMiddleware = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    logger.error(`Validation Error: ${err.message}`);
    return res.status(400).json({
      type: "about:blank",
      title: "Bad Request",
      status: 400,
      detail: err.message,
      instance: req.originalUrl,
    });
  }

  logger.error(`Internal Server Error: ${err.message}`);
  return res.status(500).json({
    type: "about:blank",
    title: "Internal Server Error",
    status: 500,
    detail: "An unexpected error occurred",
    instance: req.originalUrl,
  });
};

module.exports = errorMiddleware;
