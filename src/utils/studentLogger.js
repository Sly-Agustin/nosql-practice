const {createLogger,format,transports} = require('winston');
const {timestamp, printf, combine, json} = format

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