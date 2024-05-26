import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/db/drizzle'
import { industries, insertIndustrySchema } from '@/db/schema'
import { z } from 'zod'
import { eq, inArray } from 'drizzle-orm'

const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c)

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const data = await db.select().from(industries)

    return c.json({ data })
  })
  .get(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid('param')

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
      }

      if (!id) {
        return c.json({ error: 'Missing id' }, 400)
      }

      const [data] = await db
        .select()
        .from(industries)
        .where(eq(industries.id, id))

      if (!data) {
        return c.json({ error: 'Not found' }, 404)
      }

      return c.json({ data })
    }
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertIndustrySchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid('json')

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
      }

      const [data] = await db
        .insert(industries)
        .values({
          id: createId(),
          ...values,
        })
        .returning()

      return c.json(data)
    }
  )
  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator(
      'json',
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid('json')

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
      }

      const data = await db
        .delete(industries)
        .where(inArray(industries.id, values.ids))
        .returning({
          id: industries.id,
        })

      return c.json({ data })
    }
  )
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator('json', insertIndustrySchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid('param')
      const values = c.req.valid('json')

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
      }

      if (!id) {
        return c.json({ error: 'Missing id' }, 400)
      }

      const [data] = await db
        .update(industries)
        .set(values)
        .where(eq(industries.id, id))
        .returning()

      if (!data) {
        return c.json({ error: 'Not found' }, 404)
      }

      return c.json({ data })
    }
  )
  .delete(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid('param')

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401)
      }

      if (!id) {
        return c.json({ error: 'Missing id' }, 400)
      }

      const [data] = await db
        .delete(industries)
        .where(eq(industries.id, id))
        .returning({
          id: industries.id,
        })

      if (!data) {
        return c.json({ error: 'Not found' }, 404)
      }

      return c.json({ data })
    }
  )

export default app
