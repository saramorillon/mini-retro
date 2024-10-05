import type { IncomingMessage, ServerResponse } from 'node:http'
import { author, name, repository, version } from '../../package.json'

export function getApp(req: IncomingMessage, res: ServerResponse): void {
  res.end(JSON.stringify({ name, version, repository, author }))
}
