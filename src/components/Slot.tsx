/*
 * Image placeholder.
 *
 * Every media slot on the site renders through this until the real asset
 * exists — swap for an <img>/<video> when you drop the file in. `label`
 * describes what belongs there and doubles as the accessible name.
 *
 * Backdrop slots (hero, full-bleed sections, waveform) get a `className`
 * that anchors the label to a corner so it never collides with overlaid copy.
 */
export default function Slot({
  ratio,
  label,
  className,
}: {
  ratio?: string
  label: string
  className?: string
}) {
  return (
    <div
      className={'rp-slot' + (className ? ' ' + className : '')}
      style={ratio ? { aspectRatio: ratio } : undefined}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M4.5 18l4.7-5 3.3 3.4 2.6-2.4 4.4 4" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
