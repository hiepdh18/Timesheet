"use strict";
/**
 * @description TestServive.
 */
class TestServive {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`,
            // testRepository: this.testRepository.defaultMethod().text,
        };
    }
}
module.exports = new TestServive();
//# sourceMappingURL=TestService.js.map