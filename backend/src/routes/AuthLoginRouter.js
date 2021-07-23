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
var BaseRouter_1 = require("./BaseRouter");
var fakeData = {
    // result: {
    //   application: {
    //     version: "4.3.0.0",
    //     releaseDate: "2021-07-20T15:49:07.1350156+07:00",
    //     features: {},
    //   },
    //   user: null,
    //   tenant: null,
    // },
    // targetUrl: null,
    // success: true,
    // error: null,
    // unAuthorizedRequest: false,
    // __abp: true,
    result: {
        application: {
            version: "4.3.0.0",
            releaseDate: "2021-07-23T18:16:26.1343568+07:00",
            features: {}
        },
        user: {
            name: "admin",
            surname: "admin",
            userName: "admin",
            emailAddress: "admin@aspnetboilerplate.com",
            allowedLeaveDay: 0.0,
            type: null,
            level: null,
            sex: null,
            branch: 1,
            avatarPath: "/avatars/hiep-avatar.jpg",
            morningWorking: "4",
            morningStartAt: "08:00",
            morningEndAt: "12:00",
            afternoonWorking: "4",
            afternoonStartAt: "13:00",
            afternoonEndAt: "17:00",
            isWorkingTimeDefault: false,
            id: 1
        },
        tenant: null
    },
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true
};
/**
 * @description AuthLoginRouter
 */
var AuthLoginRouter = /** @class */ (function (_super) {
    __extends(AuthLoginRouter, _super);
    function AuthLoginRouter() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    AuthLoginRouter.prototype.init = function () {
        this.router.get("/Session/GetCurrentLoginInformations", function (req, res, next) {
            res.status(200).json(fakeData);
        });
    };
    return AuthLoginRouter;
}(BaseRouter_1.BaseRouter));
module.exports = new AuthLoginRouter().router;
