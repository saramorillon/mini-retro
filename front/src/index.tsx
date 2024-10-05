import { createTicket } from './utils/ticket'

async function run(container: HTMLElement) {
  container.style.width = '100vw'
  container.style.height = '100vh'
  container.addEventListener('dblclick', (event) => {
    createTicket(container, event.clientX, event.clientY)
  })
}

const container = document.getElementById('root')
if (container) {
  void run(container)
}
