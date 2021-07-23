"use strict";
exports.__esModule = true;
exports.BaseRouter = void 0;
var express_1 = require("express");
var BaseRouter = /** @class */ (function () {
    function BaseRouter() {
        this._router = express_1.Router();
    }
    Object.defineProperty(BaseRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: false,
        configurable: true
    });
    return BaseRouter;
}());
exports.BaseRouter = BaseRouter;
