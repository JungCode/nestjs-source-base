import { registerDecorator, ValidationOptions } from 'class-validator';

import { IsUniqueConstraint } from '../constraints/unique.constraint';

/**
 * Checks if given value is unique in the database for the specified entity and column.
 */
export function IsUnique(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constraints: { column?: string; entity: any },
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [constraints],
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: IsUniqueConstraint,
    });
  };
}
