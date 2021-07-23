"use strict";
exports.__esModule = true;
exports.winstonFormat = void 0;
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf;
exports.winstonFormat = combine(timestamp({
    format: 'DD-MM-YY HH:mm:ss'
}), printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    return timestamp + " " + level + " " + message;
}));
