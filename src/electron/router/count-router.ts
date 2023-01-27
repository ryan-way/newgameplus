import * as trpc from '@trpc/server';
import { z } from 'zod';

import { CountDb } from '../../db';
import { Count } from '../../models';

const db = new CountDb();

const router = trpc
  .router()
  .query('first', {
    async resolve() {
      return db.first();
    },
  })
  .query('read', {
    input: z.number(),
    async resolve({ input }) {
      return db.read(input);
    },
  })
  .query('read-all', {
    async resolve() {
      return db.readAll();
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.number(),
      count: z.number(),
    }),
    async resolve({ input }) {
      return db.update(input as Count);
    },
  })
  .mutation('create', {
    input: z.object({
      count: z.number(),
    }),
    async resolve({ input }) {
      return db.create(input as Count);
    },
  });

export { router };
