import z from 'zod';

import type { Validator } from '@/services/contracts/Validator';

export class ValidatorAdapter implements Validator {
  isEmail(value: string) {
    const schema = z.email();

    const { success } = schema.safeParse(value);

    return success;
  }

  isValidTitle(value: string): boolean {
    const schema = z
      .string()
      .min(5, 'The title must contain at least 5 characters')
      .max(255, 'The title must contain a maximum of 255 characters');

    return schema.safeParse(value).success;
  }

  isValidDescription(value: string): boolean {
    const schema = z
      .string()
      .min(50, 'The description must contain at least 50 characters');

    return schema.safeParse(value).success;
  }

  isValidShortDescription(value: string): boolean {
    const schema = z
      .string()
      .max(
        500,
        'The short description should contain a maximum of 500 characters'
      )
      .optional();

    return schema.safeParse(value).success;
  }
}
