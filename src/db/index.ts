import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

db.entry.create({
  data: {
    date: '2023-1-1',
    moodId: 0
  }
});