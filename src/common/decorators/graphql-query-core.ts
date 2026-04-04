// src/common/decorators/graphql-query-core.ts

// Tự định nghĩa interface cho option của @Property
export interface PropertyOptions {
  name?: string;
  required?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  type?: () => any;
}

// Tự viết class decorator @Definition()
export function Definition(options?: any): ClassDecorator {
  return (target: Function) => {
    console.log(target);
    // Hiện tại chỉ để rỗng để pass qua compiler
    // Nếu sau này cần lấy metadata, bạn sẽ dùng Reflect.defineMetadata ở đây
  };
}

// Tự viết property decorator @Property()
export function Property(options?: PropertyOptions): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    console.log(
      `Decorating property ${String(propertyKey)} with options:`,
      options,
    );
    // Hiện tại chỉ để rỗng để pass qua compiler
  };
}
