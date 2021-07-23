"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const server_1 = require("./server");
const logger_1 = require("./services/logger");
const mongo_1 = require("./services/mongo");
/**
 * Application class.
 * @description Handle init config and components.
 */
class Application {
    init() {
        this.initServer();
        this.connectToDatabase();
    }
    initServer() {
        this.server = new server_1.Server();
    }
    connectToDatabase() {
        mongo_1.mongoConfig.connect();
    }
    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.listen(port, () => logger_1.logger.info(`> Listening on port ${port}!!`));
            this.server.app.use('/api', this.server.router);
        })();
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map