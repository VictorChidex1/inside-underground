export interface HoneypotProps {
  value: string
  onChange: (value: string) => void
}

/**
 * Invisible anti-bot field. Real users never see or fill it; naive bots
 * autofill every text input and trip this trap. Callers must ignore submits
 * that carry a non-empty honeypot value.
 */
export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    >
      <label htmlFor="hp-company">Company</label>
      <input
        id="hp-company"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}