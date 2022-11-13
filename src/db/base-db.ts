import { PrismaClient } from '@prisma/client';

export abstract class BaseDb<T extends { id: number }> {
  private static client = new PrismaClient();

  static getClient() {
    return BaseDb.client;
  }

  constructor(private table) {}

  public async first(): Promise<T> {
    return await this.table.findFirst();
  }

  public async read(id: number): Promise<T> {
    return await this.table.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async readAll(): Promise<T[]> {
    return this.table.findMany();
  }

  public async create(data: T): Promise<T> {
    return this.table.create({ data: data });
  }

  public async update(data: T): Promise<T> {
    const { id, ...rest } = data;
    return this.table.update({
      where: {
        id: id,
      },
      data: rest,
    });
  }

  public async delete(data: T) {
    this.table.delete({ where: data });
  }
}
