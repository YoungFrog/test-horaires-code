import FullCalendar from '@fullcalendar/react'
import { useEffect, useRef } from 'react'

export default (switchToResource?: CallableFunction) => {
  const calendarRef = useRef<FullCalendar>(null)

  const listenKeys = (e: KeyboardEvent) => {
    const calendar = calendarRef.current

    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
      let found = true
      switch (e.key) {
        case 'ArrowLeft':
          calendar?.getApi().prev()
          break
        case 'ArrowRight':
          calendar?.getApi().next()
          break
        case 'm':
          calendar?.getApi().changeView('dayGridMonth')
          break
        case 'd':
          calendar?.getApi().changeView('timeGridDay')
          break
        case 'w':
          calendar?.getApi().changeView('timeGridWeek')
          break
        case 'g':
          if (!switchToResource) return

          // eslint-disable-next-line no-case-declarations
          const target = prompt(
            'What do you want to display ?',
            'B111'
          )?.toUpperCase()
          if (target) switchToResource(target)
          break
        default:
          found = false
      }
      if (found) e.preventDefault()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', listenKeys)
    return () => window.removeEventListener('keydown', listenKeys)
  })
  return calendarRef
}
