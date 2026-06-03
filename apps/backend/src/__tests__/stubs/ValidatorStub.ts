import type { Validator } from '@/services/contracts/Validator';

export class ValidatorStub implements Validator {
  isValidTitle(_: string): boolean {
    return true;
  }
  isValidDescription(_: string): boolean {
    return true;
  }
  isValidShortDescription(_: string): boolean {
    return true;
  }
  isEmail(_: string): boolean {
    return true;
  }
}
