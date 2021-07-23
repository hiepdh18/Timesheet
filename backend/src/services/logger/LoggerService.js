"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.stream = exports.logger = void 0;
var winston_1 = require("winston");
var LoggerFormat_1 = require("./LoggerFormat");
var LoggerTransports_1 = require("./LoggerTransports");
var logger = winston_1["default"].createLogger({
    format: LoggerFormat_1.winstonFormat,
    transports: __spreadArray([], LoggerTransports_1.winstonTransports)
});
exports.logger = logger;
var stream = {
    write: function (message) {
        logger.http(message.substring(0, message.lastIndexOf('\n')));
    }
};
exports.stream = stream;
