// src/common/decorators/graphql-query-core.ts

export interface PropertyOptions {
  filterable?: boolean;
  name?: string;
  required?: boolean;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: () => any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Definition(options?: any): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (target: Function) => {
    console.log(target, options);
  };
}

export function Property(options?: PropertyOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    console.log(
      `Decorating property ${String(propertyKey)} with options:`,
      target,
      options,
    );
  };
}
