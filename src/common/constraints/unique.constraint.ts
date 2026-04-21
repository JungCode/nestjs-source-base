import { Injectable, Logger } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

interface IsUniqueConstraintInput {
  column?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
}

@ValidatorConstraint({ async: true, name: 'IsUnique' })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private readonly logger = new Logger(IsUniqueConstraint.name);

  constructor(private readonly entityManager: EntityManager) {
    // check whether it can be injectd or not
    this.logger.log('IsUniqueConstraint initialized');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    try {
      this.logger.debug(`Checking uniqueness for ${args.property}: ${value}`);

      const { column, entity }: IsUniqueConstraintInput = args.constraints[0];
      const field = column ?? args.property;

      const count = await this.entityManager.count(entity, {
        where: { [field]: value },
      });

      this.logger.debug(`Count for ${field}=${value}: ${count}`);
      return count === 0;
    } catch (error) {
      this.logger.error(`Failed to validate uniqueness`, error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} already exists. Please choose another value.`;
  }
}
