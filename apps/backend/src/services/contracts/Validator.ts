export interface Validator {
  isEmail: (email: string) => boolean;
  isValidTitle(value: string): boolean;
  isValidDescription(value: string): boolean;
  isValidShortDescription(value: string): boolean;
}
