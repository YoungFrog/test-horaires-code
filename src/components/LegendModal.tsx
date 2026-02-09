import { useEffect } from 'react'
import { TransformerType } from '../utils/fetchCalendars'

const LegendModal = (props: {
  transformers: TransformerType[]
  close: Function
}): JSX.Element => {
  const { transformers, close } = props

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
        <div className="modal-dialog w-auto">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Légende</h5>
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
                  {transformers.map(transformer => (
                    <tr key={transformer.regex}>
                      <td
                        style={{
                          background: transformer.color,
                          color: 'white',
                          textAlign: 'center'
                        }}>
                        <span>{transformer.regex}</span>
                      </td>
                    </tr>
                  ))}
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

export default LegendModal
