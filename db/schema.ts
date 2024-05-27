import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const industries = pgTable('industries', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const insertIndustrySchema = createInsertSchema(industries)

export const sectors = pgTable('sectors', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const insertSectorSchema = createInsertSchema(sectors)
