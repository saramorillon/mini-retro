import { getJsonBody } from '@saramorillon/http-router'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { ZodError, z } from 'zod'
import { prisma } from '../prisma.js'

const schema = {
  list: z.object({
    boardId: z.string(),
    user: z.string(),
  }),
  id: z.object({
    id: z.string(),
  }),
  body: z.object({
    boardId: z.string(),
    author: z.string(),
    content: z.string(),
  }),
}

export async function getTickets(req: IncomingMessage, res: ServerResponse) {
  const { success, failure } = req.logger.start('get_tickets', { query: req.query.toString() })
  try {
    const { boardId, user } = schema.list.parse(Object.fromEntries(req.query.entries()))
    const tickets = await prisma.ticket.findMany({ where: { boardId, author: { not: user } } })
    res.statusCode = 200
    res.end(JSON.stringify(tickets))
    success()
  } catch (error) {
    res.statusCode = error instanceof ZodError ? 400 : 500
    res.end()
    failure(error)
  }
}

export async function putTicket(req: IncomingMessage, res: ServerResponse) {
  const { success, failure } = req.logger.start('put_ticket', { params: req.params })
  try {
    const { id } = schema.id.parse(req.params)
    const body = await getJsonBody(req)
    const data = schema.body.parse(body)
    await prisma.ticket.upsert({ where: { id }, create: { id, ...data }, update: data })
    res.statusCode = 204
    res.end()
    success()
  } catch (error) {
    res.statusCode = error instanceof ZodError ? 400 : 500
    res.end()
    failure(error)
  }
}

export async function deleteTicket(req: IncomingMessage, res: ServerResponse) {
  const { success, failure } = req.logger.start('delete_ticket', { params: req.params })
  try {
    const { id } = schema.id.parse(req.params)
    await prisma.ticket.delete({ where: { id } })
    res.statusCode = 204
    res.end()
    success()
  } catch (error) {
    res.statusCode = error instanceof ZodError ? 400 : 500
    res.end()
    failure(error)
  }
}
