    const winston = require("winston");

    const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combine.log' }),
        new winston.transports.Console({ format: winston.format.simple() })  // Console transport for development
    ]
    });

    const logdata = (req, res, next) => {
    if (!req.url.includes('/user/login') && !req.url.includes('/user/create')) {
        logger.info({
        timestamp: new Date().toISOString(),
        requestURL: req.url,
        requestBody: req.body
        });
    }
    next();
    };

    module.exports = { logdata, logger };
