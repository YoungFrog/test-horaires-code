import { EventApi } from '@fullcalendar/react'
import { useEffect } from 'react'
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
              <table className="table">
                <tbody>
                  {eventAttributes.cours?.length && (
                    <tr>
                      <th scope="row">Matière</th>
                      <td>
                        <p
                          onClick={() => {
                            switchTo(
                              eventAttributes.cours?.at(0)?.code,
                              'cours'
                            )
                          }}>
                          {eventAttributes.cours[0].name}
                        </p>
                      </td>
                    </tr>
                  )}

                  {eventAttributes.salles && (
                    <tr>
                      <th scope="row">Locaux</th>
                      <td>
                        <ul>
                          {eventAttributes.salles.map(lieu => (
                            <li key={lieu.code}>
                              <a
                                onClick={() => {
                                  switchTo(lieu.code, 'salles')
                                }}>
                                {lieu.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}

                  {eventAttributes.profs && (
                    <tr>
                      <th scope="row">Professeurs</th>
                      <td>
                        {eventAttributes.profs.map((prof, i) => (
                          <p
                            onClick={() => {
                              switchTo(prof.code, 'profs')
                            }}
                            key={prof.code}>
                            {prof.name}
                          </p>
                        ))}
                      </td>
                    </tr>
                  )}

                  {eventAttributes.groupes && (
                    <tr>
                      <th scope="row">Groupes</th>
                      <td>
                        {eventAttributes.groupes.map(groupe => (
                          <p
                            onClick={() => {
                              switchTo(groupe.code, 'groupes')
                            }}
                            key={groupe.code}>
                            {groupe.name}
                          </p>
                        ))}
                      </td>
                    </tr>
                  )}

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
