"use strict";
exports.__esModule = true;
exports.BaseRepository = void 0;
/**
 * @description BaseService.
 */
var BaseRepository = /** @class */ (function () {
    function BaseRepository() {
    }
    BaseRepository.prototype.defaultMethod = function () {
        return {
            text: "You've reached the " + this.constructor.name + " default method"
        };
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
