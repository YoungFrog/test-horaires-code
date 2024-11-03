import { useCallback, useEffect, useState } from 'react'
import { CalendarConfig } from '../utils/fetchCalendars'
import { Nullable } from '../utils/types'
import Select from './Select'

interface ResourceSelectorProps {
  title: string
  config: CalendarConfig
  categoryKey: Nullable<string>
  resourceKey: Nullable<string>
  switchToResource: (res?: string, cat?: string) => void
}

const ResourceSelector = (props: ResourceSelectorProps): JSX.Element => {
  const { config, categoryKey, resourceKey, switchToResource } = props

  const [wantExpanded, setWantExpanded] = useState(false)
  const selectedCategory = categoryKey ? config.data[categoryKey] : undefined
  const collapsed = !wantExpanded && !!resourceKey
  const nextResource = useCallback(
    (delta: number) => {
      if (!(categoryKey && resourceKey)) return
      const resourceIndex = config.data[categoryKey].items.findIndex(
        item => item.code === resourceKey
      )
      return config.data[categoryKey].items[resourceIndex + delta].code
    },
    [categoryKey, config.data, resourceKey]
  )

  const listenArrowKeys = (e: KeyboardEvent) => {
    if (e.shiftKey) {
      let wantedResource

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        wantedResource = nextResource(-1)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        wantedResource = nextResource(1)
      }

      if (wantedResource) {
        switchToResource(wantedResource, categoryKey || undefined)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', listenArrowKeys)
    return () => window.removeEventListener('keydown', listenArrowKeys)
  })

  return (
    <>
      <div className="accordion mb-3">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={`accordion-button ${collapsed ? 'collapsed' : ''}`}
              type="button"
              aria-expanded={!collapsed}
              aria-controls="collapseOne"
              /* setWantExpanded(collapsed) is equivalent to: setWantExpanded(!expanded) */
              onClick={() => setWantExpanded(collapsed)}>
              <strong>{props.title}</strong>
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${collapsed ? '' : 'show'}`}
            aria-labelledby="headingOne">
            <div className="accordion-body">
              <div className="row">
                <Select
                  label="Type"
                  initialKey={categoryKey ?? null}
                  selectionHandler={newcat => {
                    switchToResource(undefined, newcat)
                  }}
                  items={Object.keys(config.data).map(key => [
                    key,
                    config.data[key].name
                  ])}
                />
                {selectedCategory && (
                  <Select
                    label={`Choisissez parmi les ${selectedCategory.name.toLowerCase()}`}
                    initialKey={resourceKey ?? null}
                    selectionHandler={key => {
                      setWantExpanded(false)
                      switchToResource(key, categoryKey || undefined)
                    }}
                    items={selectedCategory.items.map(item => [
                      item.code,
                      item.name ?? item.code
                    ])}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResourceSelector
