import path from 'path';
import { transports, format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import fs from 'fs';
const { combine, ms, timestamp, simple, colorize, splat } = format;

const logDir = path.join(__dirname, '../../../LOGS');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

export const winstonTransports = [
    new transports.Console({
        format: combine(splat(), colorize(), simple(), ms()),
    }),
    new winstonDaily({
        level: 'info',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/info',
        filename: `%DATE%.info.log`,
        maxFiles: 30,
        json: true,
        zippedArchive: true,
    }),
    new winstonDaily({
        level: 'error',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/error',
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        handleExceptions: true,
        json: true,
        zippedArchive: true,
    }),
    new winstonDaily({
        level: 'http',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/http',
        filename: `%DATE%.http.log`,
        maxFiles: 30,
        handleExceptions: true,
        json: true,
        zippedArchive: true,
    }),
];
