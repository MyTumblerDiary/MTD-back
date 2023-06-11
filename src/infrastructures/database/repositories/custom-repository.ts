export interface CustomRepository<T> {
  create(data: Partial<T>): T;

  createMany(data: Partial<T>[]): T[];

  save(data: T): Promise<T>;

  find(options?: any): Promise<T[]>;

  findOne(options?: any): Promise<T>;

  findOneOrFail(options?: any): Promise<T>;

  update(id: string, data: Partial<T>): Promise<T>;

  softDelete(id: string): Promise<boolean>;

  delete(id: string): Promise<boolean>;
}
