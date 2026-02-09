const configUrl: string = require('./configUrl.json')

export interface Resource {
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

export interface TransformerType {
  regex: string
  color: string
}

export interface CalendarConfig {
  default: string
  root: string
  data: CalendarData
  transformers?: TransformerType[]
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

export const freeEventsUrl: string = new URL(
  'freeevents.json',
  new URL(configUrl, location.href)
).toString()

export const configRoot: string = new URL(
  '.',
  new URL(configUrl, location.href)
).toString()

export default fetchCalendars
