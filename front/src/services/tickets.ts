import type { ITicket } from '../models/Ticket'

export function getTickets(boardId: number, user: string): Promise<ITicket[]> {
  return fetch(`/api/tickets?boardId=${boardId}&user=${user}`).then((res) => res.json())
}

export function saveTicket(ticketId: string, content: string) {
  const params = new URLSearchParams(window.location.search)
  const boardId = params.get('boardId') || 'test'
  const author = params.get('name') || 'test'
  return fetch(`/api/ticket/${ticketId}`, {
    method: 'put',
    body: JSON.stringify({
      boardId,
      author,
      content,
      hidden: true,
    }),
  })
}

export function deleteTicket(ticketId: string) {
  return fetch(`/api/ticket/${ticketId}`, { method: 'delete' })
}
