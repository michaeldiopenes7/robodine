import type { ReactNode } from 'react'

/*
 * A full-bleed page band.
 *
 * The background paints edge to edge across the viewport while the inner
 * wrapper holds content at a readable measure. `tone` picks the surface:
 * light (default), dark navy, or the grey used by the parameters block.
 */
export default function Band({
  tone = 'light',
  tight,
  id,
  children,
}: {
  tone?: 'light' | 'dark' | 'grey'
  tight?: boolean
  id?: string
  children: ReactNode
}) {
  const cls = [
    'rp-band',
    tone === 'dark' ? 'rp-band-dark' : '',
    tone === 'grey' ? 'rp-band-grey' : '',
    tight ? 'rp-band-tight' : '',
  ].filter(Boolean).join(' ')

  return (
    <section id={id} className={cls}>
      <div className="rp-inner">{children}</div>
    </section>
  )
}
