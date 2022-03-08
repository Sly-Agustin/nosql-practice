const {createLogger,format,transports} = require('winston');
const winston = require('winston');
const {timestamp, printf, combine, json} = format

const myFormat = format.printf(({level, message, timestamp, errors, data}) => {
    const errorsJson = errors ? 'Errors ocurred: '+JSON.stringify(errors) : '';
    const dataJson = data ? 'Data received: '+JSON.stringify(data) : '';
    return `${timestamp} [${level}]: ${message}. ${errorsJson} ${dataJson}`;
});
  
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: combine(timestamp(), myFormat, json())
        }),
        new transports.File({
            format: myformat,
            maxsize: 5120000,   // Max size in bytes
            maxFiles: 5,        // If a 6th file log will be created, it will delete the oldest, preserving a max of 5 files
            filename: `${__dirname}/../../logs/student-logs.log`
        })
    ]
});

module.exports = createLogger({
    format: combine(timestamp(), json()),
    transports: [
        new transports.File({
            maxsize: 5120000,   // Max size in bytes
            maxFiles: 5,        // If a 6th file log will be created, it will delete the oldest, preserving a max of 5 files
            filename: `${__dirname}/../../logs/student-logs.log`
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})