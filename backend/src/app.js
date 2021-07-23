"use strict";
exports.__esModule = true;
exports.Application = void 0;
var server_1 = require("./server");
var logger_1 = require("./services/logger");
var mongo_1 = require("./services/mongo");
/**
 * Application class.
 * @description Handle init config and components.
 */
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.prototype.init = function () {
        this.initServer();
        this.connectToDatabase();
    };
    Application.prototype.initServer = function () {
        this.server = new server_1.Server();
    };
    Application.prototype.connectToDatabase = function () {
        mongo_1.mongoConfig.connect();
    };
    Application.prototype.start = function () {
        var _this = this;
        (function (port) {
            if (port === void 0) { port = process.env.APP_PORT || 5000; }
            _this.server.app.listen(port, function () {
                return logger_1.logger.info("> Listening on port " + port);
            });
            _this.server.app.use('/api', _this.server.router);
        })();
    };
    return Application;
}());
exports.Application = Application;
