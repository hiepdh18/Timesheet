"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const LoggerFormat_1 = require("./LoggerFormat");
const LoggerTransports_1 = require("./LoggerTransports");
const logger = winston_1.default.createLogger({
    format: LoggerFormat_1.winstonFormat,
    transports: [...LoggerTransports_1.winstonTransports],
});
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.http(message.substring(0, message.lastIndexOf('\n')));
    },
};
exports.stream = stream;
//# sourceMappingURL=LoggerService.js.map