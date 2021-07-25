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
exports.Application = void 0;
const server_1 = require("./server");
const logger_1 = require("./services/logger");
const mongo_1 = require("./services/mongo");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const models_1 = require("./models");
const mongoose_1 = require("mongoose");
/**
 * Application class.
 * @description Handle init config and components.
 */
class Application {
    constructor() {
        this.createLevel = () => __awaiter(this, void 0, void 0, function* () {
            const level = new models_1.Level({
                _id: mongoose_1.Types.ObjectId(),
                name: 'intern'
            });
            yield level.save();
            console.log(level);
        });
    }
    init() {
        this.initServer();
        this.initDatabase();
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.listen(port, () => {
                logger_1.logger.info(`> Listening on port ${port}!!`);
            });
            this.server.app.use('/api', this.server.router);
            console.log(express_list_endpoints_1.default(this.server.app)); // log out all routes that server serve
        })();
    }
    initServer() {
        this.server = new server_1.Server();
        this.server.app.use('/avatars', express_1.default.static(path_1.default.join(__dirname + '/../public/avatars')));
        this.createLevel();
    }
    initDatabase() {
        mongo_1.mongoService.connect();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map