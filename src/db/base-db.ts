import { PrismaClient } from '@prisma/client';

export abstract class BaseDb<T extends { id: number }> {
  private static client = new PrismaClient();

  static getClient() {
    return BaseDb.client;
  }

  constructor(private table) {}

  public first(): T {
    return this.table.findFirst();
  }

  public read(id: number): T {
    return this.table.findUnique({
      where: {
        id: id,
      },
    });
  }

  public readAll(): T[] {
    return this.table.findMany();
  }

  public create(data: T): T {
    return this.table.create({ data: data });
  }

  public update(data: T): T {
    const { id, ...rest } = data;
    return this.table.update({
      where: {
        id: id,
      },
      data: rest,
    });
  }

  public delete(data: T) {
    this.table.delete({ where: data });
  }
}
