import { pgTable, text } from 'drizzle-orm/pg-core'

export const industries = pgTable('industries', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
})
