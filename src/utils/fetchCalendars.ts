const configUrl: string = require('./configUrl.json')

interface Resource {
  name: string // nom long
  code: string // nom court
}

// interface CalendarResources {
//   [key: string]: Resource
// }

interface CalendarCategory {
  name: string
  items: Resource[]
}

interface CalendarData {
  [key: string]: CalendarCategory
}

interface CalendarConfig {
  default: string
  root: string
  data: CalendarData
}

const fetchCalendars = async (): Promise<CalendarConfig> => {
  return fetch(configUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })
    .then(value => value.json())
    .then(json => ({
      ...json,
      root: new URL(json.root, new URL(configUrl, location.href))
    }))
}

const freeEventsUrl: string = new URL(
  'freeevents.json',
  new URL(configUrl, location.href)
).toString()

export { CalendarConfig, Resource, freeEventsUrl }

export default fetchCalendars
