"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TestService_1 = require("../services/test/TestService");
var BaseRouter_1 = require("./BaseRouter");
/**
 * @description TestRouter.
 */
var TestRouter = /** @class */ (function (_super) {
    __extends(TestRouter, _super);
    function TestRouter() {
        var _this = _super.call(this) || this;
        _this._service = TestService_1["default"];
        _this.init();
        return _this;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    TestRouter.prototype.init = function () {
        var _this = this;
        this.router.get("/", function (req, res, next) {
            res.status(200).json(_this._service.defaultMethod());
        });
    };
    return TestRouter;
}(BaseRouter_1.BaseRouter));
module.exports = new TestRouter().router;
