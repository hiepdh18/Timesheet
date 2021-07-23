"use strict";
exports.__esModule = true;
exports.Server = void 0;
var express_1 = require("express");
var MasterRouter_1 = require("./routes/MasterRouter");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({
    path: ".env"
});
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1["default"]();
        this.router = MasterRouter_1["default"];
    }
    return Server;
}());
exports.Server = Server;
