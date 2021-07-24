"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoService = exports.MongoService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../logger");
const config_1 = require("../../config");
class MongoService {
    constructor(uri, config) {
        this.uri = uri;
        this.config = config;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.uri, this.config);
                logger_1.logger.info("Database cennected!!!");
            }
            catch (error) {
                logger_1.logger.error(error.message);
                throw new Error(error);
            }
        });
    }
}
exports.MongoService = MongoService;
const uri = process.env.MONGO_URI;
exports.mongoService = new MongoService(uri, config_1.mongoConfig);
//# sourceMappingURL=MongoService.js.map