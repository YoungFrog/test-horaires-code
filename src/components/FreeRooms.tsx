import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import frLocale from '@fullcalendar/core/locales/fr'
import useKeyboardNav from '../hooks/useKeyboardNav'
import { freeEventsUrl } from '../utils/fetchCalendars'

const FreeRooms = (): JSX.Element => {
  const calendarRef = useKeyboardNav()

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, dayGridPlugin, momentTimezonePlugin]}
      initialView="timeGridWeek"
      weekends={true}
      hiddenDays={[0]}
      headerToolbar={{
        start: 'prev today next',
        center: 'title',
        end: 'dayGridMonth timeGridWeek timeGridDay'
      }}
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      businessHours={{
        dayOfWeek: [1, 2, 3, 4, 5],
        startTime: '08:15',
        endTime: '18:00'
      }}
      fixedWeekCount={false}
      showNonCurrentDates={false}
      firstDay={0}
      locale={frLocale}
      timeZone="Europe/Brussels"
      events={freeEventsUrl}
      contentHeight="75vh"
      stickyHeaderDates={true}
      eventSourceFailure={errorObj => {
        console.log(errorObj)
        alert('could not fetch events. please check connection and refresh.')
      }}
    />
  )
}

export default FreeRooms
