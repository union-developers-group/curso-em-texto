import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { coursesTable } from './courses';

export const modulesTable = pgTable(
  'modules',
  {
    id: uuid().primaryKey().defaultRandom(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => coursesTable.id, { onDelete: 'cascade' }),
    title: varchar({ length: 255 }).notNull(),
    order: integer().default(0).notNull(),
    isPublished: boolean('is_published').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('idx_modules_course_id').on(table.courseId)]
);
