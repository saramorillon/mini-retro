import { v4 } from 'uuid'
import type { ITicket } from '../models/Ticket'
import { deleteTicket, saveTicket } from '../services/tickets'

const width = 200
const height = 200

export function createTicket(container: HTMLElement, startX: number, startY: number) {
  const ticket: ITicket = {
    id: v4(),
    boardId: '',
    author: '',
    content: '',
    hidden: true,
    x: startX - width / 2,
    y: startY - height / 2,
  }

  let clickX = 0
  let clickY = 0
  let isMoving = false
  let isEditing = false

  const editor = document.createElement('textarea')
  editor.classList.add('ticket')

  function render() {
    editor.style.left = `${ticket.x}px`
    editor.style.top = `${ticket.y}px`
    if (isMoving) {
      editor.setAttribute('readonly', 'true')
    } else if (isEditing) {
      editor.removeAttribute('readonly')
      editor.focus()
      editor.setSelectionRange(editor.value.length - 1, editor.value.length - 1)
    }
  }

  render()

  function onDragStart(event: MouseEvent) {
    event.stopPropagation()
    isMoving = true
    clickX = event.clientX - ticket.x
    clickY = event.clientY - ticket.y
    container.addEventListener('mousemove', onDragMove)
    container.addEventListener('mouseup', onDragEnd)
  }

  function onDragMove(event: MouseEvent) {
    event.stopPropagation()
    if (isMoving) {
      ticket.x = event.clientX - clickX
      ticket.y = event.clientY - clickY
      render()
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
    render()
  }

  function onEditEnd(event: FocusEvent) {
    event.stopPropagation()
    if (isEditing) {
      isEditing = false
      render()
      saveTicket(ticket)
    }
  }

  function onDelete(event: KeyboardEvent) {
    event.stopPropagation()
    if (!isEditing && event.key === 'Delete') {
      deleteTicket(ticket)
      container.removeChild(editor)
    }
  }

  editor.addEventListener('mousedown', onDragStart)
  editor.addEventListener('dblclick', onEditStart)
  editor.addEventListener('blur', onEditEnd)
  editor.addEventListener('keyup', onDelete)

  container.appendChild(editor)
}
