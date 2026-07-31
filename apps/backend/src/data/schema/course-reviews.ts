import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { coursesTable } from './courses';
import { usersTable } from './users';

export const courseReviewsTable = pgTable(
  'course_reviews',
  {
    id: uuid().primaryKey().defaultRandom(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => coursesTable.id),
    adminId: uuid('admin_id')
      .notNull()
      .references(() => usersTable.id),
    status: varchar().notNull(),
    feedback: text(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_course_reviews_course_id').on(table.courseId),
    index('idx_course_reviews_admin_id').on(table.adminId),
  ]
);
