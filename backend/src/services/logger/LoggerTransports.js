"use strict";
exports.__esModule = true;
exports.winstonTransports = void 0;
var path_1 = require("path");
var winston_1 = require("winston");
var winston_daily_rotate_file_1 = require("winston-daily-rotate-file");
var fs_1 = require("fs");
var combine = winston_1.format.combine, ms = winston_1.format.ms, timestamp = winston_1.format.timestamp, simple = winston_1.format.simple, colorize = winston_1.format.colorize, splat = winston_1.format.splat;
var logDir = path_1["default"].join(__dirname, '../../../LOGS');
if (!fs_1["default"].existsSync(logDir)) {
    fs_1["default"].mkdirSync(logDir);
}
exports.winstonTransports = [
    new winston_1.transports.Console({
        format: combine(splat(), colorize(), simple(), ms())
    }),
    new winston_daily_rotate_file_1["default"]({
        level: 'info',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/info',
        filename: "%DATE%.info.log",
        maxFiles: 30,
        json: true,
        zippedArchive: true
    }),
    new winston_daily_rotate_file_1["default"]({
        level: 'error',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/error',
        filename: "%DATE%.error.log",
        maxFiles: 30,
        handleExceptions: true,
        json: true,
        zippedArchive: true
    }),
    new winston_daily_rotate_file_1["default"]({
        level: 'http',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/http',
        filename: "%DATE%.http.log",
        maxFiles: 30,
        handleExceptions: true,
        json: true,
        zippedArchive: true
    }),
];
