import { Brackets, ObjectLiteral } from 'typeorm'

declare module 'typeorm/query-builder/SelectQueryBuilder' {
    interface SelectQueryBuilder<Entity> {
        andWhereSafe(
            this: SelectQueryBuilder<Entity>,
            where: string | ObjectLiteral | Brackets | ObjectLiteral[],
            parameter?: ObjectLiteral,
            condition?: boolean | (() => boolean),
        ): SelectQueryBuilder<Entity>
    }
}
