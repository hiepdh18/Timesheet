import TestRepository from "../../repositories/TestRepository";
import { IService } from "../../interfaces";

/**
 * @description TestServive.
 */
class TestServive implements IService  {
  private testRepository = TestRepository;

  defaultMethod() {
    return {
      text: `You've reached the ${this.constructor.name} default method`,
      testRepository: this.testRepository.defaultMethod().text,
    };
  }
}

export = new TestServive();
