import { v4 } from 'uuid'
import { deleteTicket, saveTicket } from '../services/tickets'

export function createTicket(container: HTMLElement, startX: number, startY: number) {
  let id = ''
  const width = 200
  const height = 200
  let x = startX - width / 2
  let y = startY - height / 2
  let clickX = 0
  let clickY = 0
  let isMoving = false
  let isEditing = false

  const ticket = document.createElement('textarea')

  function reset() {
    ticket.style.display = 'block'
    ticket.style.position = 'absolute'
    ticket.style.backgroundColor = 'red'
    ticket.style.border = 'none'
    ticket.style.overflow = 'auto'
    ticket.style.width = `${width}px`
    ticket.style.height = `${height}px`
    ticket.style.zIndex = '2'
    ticket.style.resize = 'none'
    ticket.style.userSelect = 'none'
    ticket.style.cursor = 'pointer'
    ticket.setAttribute('readonly', 'true')
  }

  function move(x: number, y: number) {
    ticket.style.left = `${x}px`
    ticket.style.top = `${y}px`
  }

  function edit() {
    ticket.style.border = '2px solid blue'
    ticket.style.removeProperty('userSelect')
    ticket.removeAttribute('readonly')
    ticket.focus()
    ticket.setSelectionRange(ticket.value.length - 1, ticket.value.length - 1)
  }

  reset()
  move(x, y)

  function onDragStart(event: MouseEvent) {
    event.stopPropagation()
    isMoving = true
    onEditEnd(event)
    clickX = event.clientX - x
    clickY = event.clientY - y
    container.addEventListener('mousemove', onDragMove)
    container.addEventListener('mouseup', onDragEnd)
  }

  function onDragMove(event: MouseEvent) {
    event.stopPropagation()
    if (isMoving) {
      x = event.clientX - clickX
      y = event.clientY - clickY
      move(x, y)
    }
  }

  function onDragEnd(event: MouseEvent) {
    event.stopPropagation()
    if (isMoving) {
      isMoving = false
      container.removeEventListener('mousemove', onDragMove)
      container.removeEventListener('mouseup', onDragEnd)
    }
  }

  function onEditStart(event: MouseEvent) {
    event.stopPropagation()
    isEditing = true
    edit()
    container.addEventListener('click', onEditEnd)
  }

  function onEditEnd(event: MouseEvent) {
    event.stopPropagation()
    if (isEditing) {
      isEditing = false
      reset()
      container.removeEventListener('click', onEditEnd)
      if (!id) id = v4()
      saveTicket(id, ticket.value)
    }
  }

  function onDelete(event: KeyboardEvent) {
    event.stopPropagation()
    if (!isEditing && event.key === 'Delete') {
      if (id) deleteTicket(id)
      container.removeChild(ticket)
    }
  }

  ticket.addEventListener('mousedown', onDragStart)
  ticket.addEventListener('dblclick', onEditStart)
  ticket.addEventListener('keyup', onDelete)

  container.appendChild(ticket)
}
