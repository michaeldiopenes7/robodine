import type { CSSProperties } from 'react'

/*
 * Audio waveform backdrop for the voice section.
 *
 * Drawn as SVG rather than shipped as an image so it scales cleanly and
 * carries the brand gradient. The silhouette matters more than realism
 * here: many thin bars, a smooth swell from near-silence at both edges to
 * a dense middle, and enough irregularity that no repeating pattern reads.
 *
 * The idle silhouette comes from layered sines at incommensurable
 * frequencies plus deterministic jitter. During playback, live analyser
 * levels from the voice sample drive the bars so the trace punches on
 * syllables instead of waving on its own.
 */

const BARS = 150
const VIEW_W = 2000
const VIEW_H = 300

/* Deterministic pseudo-random in [0,1). */
function noise(i: number) {
  const x = Math.sin(i * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function barHeight(i: number) {
  const t = i / (BARS - 1)

  /* Envelope: a broad swell across the middle, tapering to almost nothing
     at both ends. Raised to a power so the falloff is gradual rather than
     a hard cone, and floored so the tails stay visible as a thin line. */
  const swell = Math.sin(Math.PI * t) ** 0.62

  /* Two envelope lobes — busier left of centre and again right of it —
     so the trace reads as speech with a pause rather than one blob. */
  const lobes = 0.72 + 0.28 * Math.sin(t * Math.PI * 2 - Math.PI / 2)

  /* Layered detuned sines: irrational-ish ratios so nothing repeats. */
  const detail =
    0.50 +
    0.22 * Math.sin(t * 41.3 + 0.7) +
    0.14 * Math.sin(t * 97.1 + 2.1) +
    0.09 * Math.sin(t * 163.7 + 4.2)

  /* Per-bar jitter keeps adjacent bars from stepping smoothly. */
  const jitter = 0.72 + 0.56 * noise(i)

  /* Occasional tall transients, as in a real recording. */
  const peak = noise(i * 3.1) > 0.965 ? 1.45 : 1

  return Math.max(0.012, swell * lobes * detail * jitter * peak)
}

function smoothLevel(levels: number[], index: number) {
  if (!levels.length) return 0

  const prev = levels[Math.max(0, index - 1)] ?? 0
  const current = levels[index] ?? 0
  const next = levels[Math.min(levels.length - 1, index + 1)] ?? 0

  return prev * 0.22 + current * 0.56 + next * 0.22
}

export default function Waveform({
  active = false,
  levels = [],
}: {
  active?: boolean
  levels?: number[]
}) {
  const gap = VIEW_W / BARS
  const barW = gap * 0.30
  const midpoint = (BARS - 1) / 2
  const energy = levels.length
    ? levels.reduce((total, level) => total + level, 0) / levels.length
    : 0

  return (
    <svg
      className={'rp-wave' + (active ? ' is-active' : '')}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="rp-wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A5CF0" />
          <stop offset="38%" stopColor="#4B6FE8" />
          <stop offset="72%" stopColor="#2E96E6" />
          <stop offset="100%" stopColor="#35C6EA" />
        </linearGradient>
      </defs>

      {Array.from({ length: BARS }, (_, i) => {
        const distanceFromCenter = Math.abs(i - midpoint) / midpoint
        const centerWeight = (1 - distanceFromCenter) ** 1.9
        const mirroredIndex = levels.length
          ? Math.min(levels.length - 1, Math.floor((1 - distanceFromCenter) * levels.length))
          : 0
        const sample = smoothLevel(levels, mirroredIndex)
        const amp = active
          ? Math.min(1, (0.035 + energy * 0.85 + sample * 0.65) * (0.26 + centerWeight * 1.55))
          : 0
        const flutter = 0.86 + noise(i + 12) * 0.32
        const waveScale = active ? 0.52 + centerWeight * 0.20 + amp * 2.12 : 0.55
        const h = barHeight(i) * (VIEW_H * 0.50)
        const x = i * gap + (gap - barW) / 2
        return (
          <rect
            key={i}
            x={x}
            y={(VIEW_H - h) / 2}
            width={barW}
            height={h}
            rx={barW / 2}
            fill="url(#rp-wave-grad)"
            /* Stagger keeps the motion travelling across the trace rather
               than every idle bar breathing in unison. */
            style={{
              '--amp': amp.toFixed(3),
              '--center': centerWeight.toFixed(3),
              '--wave-opacity': (active
                ? 0.42 + centerWeight * 0.18 + amp * 0.38
                : 0.52
              ).toFixed(3),
              '--wave-scale': waveScale.toFixed(3),
              '--live-rest': (0.90 + centerWeight * 0.08).toFixed(3),
              '--live-peak': (1.02 + amp * flutter * 0.28).toFixed(3),
              '--live-rebound': (0.96 + amp * 0.12).toFixed(3),
              '--live-lift': `${(-3 * centerWeight).toFixed(2)}px`,
              '--live-drop': `${(2 * centerWeight).toFixed(2)}px`,
              animationDelay: `${(i % 17) * 55}ms`,
            } as CSSProperties}
          />
        )
      })}
    </svg>
  )
}
