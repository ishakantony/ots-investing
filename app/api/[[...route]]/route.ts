import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import industries from './industries'
import sectors from './sectors'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app.route('/industries', industries).route('/sectors', sectors)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
