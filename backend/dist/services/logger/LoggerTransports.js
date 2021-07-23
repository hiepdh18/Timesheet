"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonTransports = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const fs_1 = __importDefault(require("fs"));
const { combine, ms, timestamp, simple, colorize, splat } = winston_1.format;
const logDir = path_1.default.join(__dirname, '../../../LOGS');
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
exports.winstonTransports = [
    new winston_1.transports.Console({
        format: combine(splat(), colorize(), simple(), ms()),
    }),
    new winston_daily_rotate_file_1.default({
        level: 'info',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/info',
        filename: `%DATE%.info.log`,
        maxFiles: 30,
        json: true,
        zippedArchive: true,
    }),
    new winston_daily_rotate_file_1.default({
        level: 'error',
        datePattern: 'DD-MM-YYYY',
        dirname: logDir + '/error',
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        handleExceptions: true,
        json: true,
        zippedArchive: true,
    }),
    new winston_daily_rotate_file_1.default({
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
//# sourceMappingURL=LoggerTransports.js.map