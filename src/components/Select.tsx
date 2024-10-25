import { Dispatch, useId } from 'react'

interface SelectProps {
  label: string
  selectionHandler: Dispatch<string>
  items: { [key: string]: string }
  initialKey: string | null
}

const Select = (props: SelectProps) => {
  const { label, items, initialKey, selectionHandler } = props
  const id = useId()

  return (
    <div className="col-md-3 mb-md-0">
      <label className="form-label" htmlFor={id}>
        <strong>{label}</strong>
      </label>
      <select
        id={id}
        className="form-control custom-select"
        onChange={e => selectionHandler(e.target.value)}
        value={initialKey ?? 0}>
        <option disabled value={0}>
          {label}
        </option>
        {Object.entries(items)
          .sort()
          .map(([key, item]) => (
            <option key={key} value={key}>
              {item}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Select
