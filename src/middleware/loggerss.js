const winston = require('winston');

// Configure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Request logging middleware
const logRequest = (req, res, next) => {
    const { method, url, body, params } = req;
    logger.info('HTTP Request', { method, url, body, params });
    next();
};

// Error handling middleware
const logErrors = (err, req, res, next) => {
    logger.error('Error', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body
    });
    res.status(500).send('Internal Server Error');
};

module.exports = { logger, logRequest, logErrors };
