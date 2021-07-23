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
var AuthLoginRouter_1 = require("./AuthLoginRouter");
var BaseRouter_1 = require("./BaseRouter");
var TestRouter_1 = require("./TestRouter");
var bodyParser = require("body-parser");
var cors = require("cors");
var MasterRouter = /** @class */ (function (_super) {
    __extends(MasterRouter, _super);
    function MasterRouter() {
        var _this = _super.call(this) || this;
        _this.configure();
        _this.init();
        return _this;
    }
    MasterRouter.prototype.configure = function () {
        // define onfigurations
        this.router.use(cors());
        this.router.use(bodyParser.json()); // to support JSON-encoded bodies
        this.router.use(bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true
        }));
    };
    /**
     * Connect routes to their matching routers.
     */
    MasterRouter.prototype.init = function () {
        this.router.use("/test", TestRouter_1["default"]);
        this.router.use("/services/app", AuthLoginRouter_1["default"]);
    };
    return MasterRouter;
}(BaseRouter_1.BaseRouter));
module.exports = new MasterRouter().router;
