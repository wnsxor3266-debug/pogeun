type ChipOption = {
  label: string
  value: number
}

type ChipGroupProps = {
  options: ChipOption[]
  value: number
  onChange: (value: number) => void
  vertical?: boolean
}

function ChipGroup({ options, value, onChange, vertical }: ChipGroupProps) {
  return (
    <div className={`chip-group ${vertical ? 'chip-group--vertical' : ''}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`chip ${value === option.value ? 'is-selected' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ChipGroup
