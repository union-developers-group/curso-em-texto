import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  index,
  text,
} from 'drizzle-orm/pg-core';

import { coursesTable } from './courses';
import { modulesTable } from './modules';

export const lessonsTable = pgTable(
  'lessons',
  {
    id: uuid().primaryKey().defaultRandom(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => coursesTable.id, { onDelete: 'cascade' }),
    moduleId: uuid('module_id')
      .notNull()
      .references(() => modulesTable.id, { onDelete: 'cascade' }),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull(),
    order: integer().default(0).notNull(),
    isPublished: boolean('is_published').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_lessons_course_id').on(table.courseId),
    index('idx_lessons_module_id').on(table.moduleId),
  ]
);
