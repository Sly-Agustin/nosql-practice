const {createLogger,format,transports} = require('winston');
const {timestamp, printf, combine, json} = format

// Format is ignored if called with json() because it's not json...
const myFormat = format.printf(({level, message, timestamp, errors, data, processTime}) => {
    const errorsJson = errors ? 'Errors ocurred: '+JSON.stringify(errors) : '';
    const dataJson = data ? 'Data received: '+JSON.stringify(data) : '';
    return `${timestamp} [${level}]: ${message}. ${errorsJson} ${dataJson} ${processTime}`;
});

const myJsonFormat = format.printf(({level, message, timestamp, errors, data, processTime}) => {
    const errorsJson = errors ? JSON.stringify(errors) : '';
    const dataJson = data ? JSON.stringify(data) : '';
    return {
        timestamp: timestamp,
        level: level,
        message: message,
        errors: errorsJson,
        data: dataJson,
        processTime: processTime
    }
});

module.exports = createLogger({
    format: combine(timestamp(), myJsonFormat, json()),
    //format: combine(timestamp('YYYY-MM-DD HH:mm:ss'), myFormat),
    transports: [
        new transports.File({
            maxsize: 5120000,   // Max size in bytes
            maxFiles: 5,        // If a 6th file log will be created, it will delete the oldest, preserving a max of 5 files
            filename: `${__dirname}/../../logs/questionnaire-logs.log`,
            level: 'debug'
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})