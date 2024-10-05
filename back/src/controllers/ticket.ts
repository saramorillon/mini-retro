import { getJsonBody } from '@saramorillon/http-router'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { z } from 'zod'
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
  const { boardId, user } = schema.list.parse(Object.fromEntries(req.query.entries()))
  const tickets = await prisma.ticket.findMany({ where: { boardId, author: { not: user } } })
  res.statusCode = 200
  res.end(JSON.stringify(tickets))
}

export async function putTicket(req: IncomingMessage, res: ServerResponse) {
  const { id } = schema.id.parse(req.params)
  const body = await getJsonBody(req)
  const data = schema.body.parse(body)
  await prisma.ticket.upsert({ where: { id }, create: { id, ...data }, update: data })
  res.statusCode = 204
  res.end()
}

export async function deleteTicket(req: IncomingMessage, res: ServerResponse) {
  const { id } = schema.id.parse(req.params)
  await prisma.ticket.delete({ where: { id } })
  res.statusCode = 204
  res.end()
}
