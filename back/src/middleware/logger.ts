import { Logger } from '@saramorillon/logger'
import type { IncomingMessage, ServerResponse } from 'node:http'

declare module 'node:http' {
  interface IncomingMessage {
    logger: Logger
  }
}

export function logger(req: IncomingMessage, res: ServerResponse) {
  req.logger = new Logger()
}
