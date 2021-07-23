"use strict";
var TestRepository_1 = require("../../repositories/TestRepository");
/**
 * @description TestServive.
 */
var TestServive = /** @class */ (function () {
    function TestServive() {
        this.testRepository = TestRepository_1["default"];
    }
    TestServive.prototype.defaultMethod = function () {
        return {
            text: "You've reached the " + this.constructor.name + " default method",
            testRepository: this.testRepository.defaultMethod().text
        };
    };
    return TestServive;
}());
module.exports = new TestServive();
