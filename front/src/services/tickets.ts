import type { ITicket } from '../models/Ticket'

export async function getTickets(boardId: number, user: string): Promise<ITicket[]> {
  // return fetch(`/api/tickets?boardId=${boardId}&user=${user}`).then((res) => res.json())
  return []
}

export function saveTicket(ticket: ITicket) {
  // return fetch(`/api/ticket/${ticket.id}`, { method: 'put', body: JSON.stringify(ticket) })
}

export function deleteTicket(ticket: ITicket) {
  // return fetch(`/api/ticket/${ticketId}`, { method: 'delete' })
}
