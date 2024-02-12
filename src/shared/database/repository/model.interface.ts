import { FindOptions, Transaction, WhereOptions } from "sequelize";

export interface IModel<M> {
    create<T = any>(data: T, transaction: Transaction | null);

    bulkCreate<T = any>(data: T[], transaction: Transaction | null): Promise<M[]>;

    findAll<T = any>(filter?: WhereOptions<M>, includes?: FindOptions<T>): Promise<M[]>;

    findOne<T = any>(filter: WhereOptions<M>, includes?: FindOptions<T>): Promise<M>;

    findById<T = any>(id: string | number, includes?: FindOptions<T>): Promise<M>;

    update<T = any>(filter: WhereOptions<M>, data: Partial<T>, transaction?: Transaction | null): Promise<M>;

    delete<T = any>(filter: WhereOptions<T>, transaction?: Transaction | null): Promise<M>;
}