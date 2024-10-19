import * as winston from 'winston';

const logMessageFormat = winston.format((info) => {
    const dateTime: string = '[' + new Date().toString() + ']: ';
    info.message = dateTime + info.message;
    return info;
});

export default winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        logMessageFormat(),
        winston.format.simple()
    ),
    transports: [new winston.transports.File({ filename: 'logs/all.log' })]
});
