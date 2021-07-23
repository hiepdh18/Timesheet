"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonFormat = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
exports.winstonFormat = combine(timestamp({
    format: 'DD-MM-YY HH:mm:ss',
}), printf(({ timestamp, level, message }) => `${timestamp} ${level} ${message}`));
//# sourceMappingURL=LoggerFormat.js.map