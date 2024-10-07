import { Router } from '@saramorillon/http-router'
import { type IncomingMessage, type ServerResponse, createServer } from 'node:http'
import { deleteTicket, getTickets, putTicket } from './controllers/ticket.js'
import { logger } from './middleware/logger.js'

const router = new Router()

router.use(logger)
router.get('/api/tickets', getTickets)
router.put('/api/ticket/:id', putTicket)
router.delete('/api/ticket/:id', deleteTicket)

createServer((req: IncomingMessage, res: ServerResponse) => {
  router.listen(req, res)
}).listen(3000, () => console.log('Listening'))
