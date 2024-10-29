import { EventApi } from '@fullcalendar/react'
import { ReactNode, useEffect } from 'react'
import parseDescription from '../utils/parseDescription'

const EventModal = (props: {
  selectedEvent: EventApi
  close: Function
  switchTo: (resource?: string, category?: string) => void
}): JSX.Element => {
  const { selectedEvent, close, switchTo } = props

  const description = selectedEvent.extendedProps.description
  const eventAttributes = parseDescription(description)

  const listenEscapeKey = (e: KeyboardEvent) => {
    if (!e.shiftKey && !e.ctrlKey && !e.altKey && e.key === 'Escape') {
      close()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', listenEscapeKey)
    return () => window.removeEventListener('keydown', listenEscapeKey)
  })

  function afficherLigne(
    items: { code: string; name: string }[] | undefined,
    titre: string,
    type: string
  ): ReactNode {
    return (
      items?.length && (
        <tr>
          <th scope="row">{titre}</th>
          <td>
            <ul className="list-unstyled">
              {items.map(thing => (
                <li key={thing.code} onClick={() => switchTo(thing.code, type)}>
                  {thing.name}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )
    )
  }

  return (
    <>
      <div
        className="modal"
        tabIndex={-1}
        style={{ display: 'block' }}
        onClick={e => {
          if (e.target === e.currentTarget) close()
        }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedEvent.title}</h5>
              <button
                type="button"
                className="btn-close text-reset"
                aria-label="Close"
                onClick={() => close()}
              />
            </div>
            <div className="modal-body">
              <table className="table table-sm">
                <tbody>
                  {afficherLigne(eventAttributes.cours, 'Matière', 'cours')}
                  {afficherLigne(eventAttributes.salles, 'Locaux', 'salles')}
                  {afficherLigne(eventAttributes.profs, 'Professeurs', 'profs')}
                  {afficherLigne(eventAttributes.groupes, 'Groupes', 'groupes')}

                  {eventAttributes.type && (
                    <tr>
                      <th scope="row">Type</th>
                      <td>
                        <p>{eventAttributes.type}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}

export default EventModal
