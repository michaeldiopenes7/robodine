import Slot from '../components/Slot'

/*
 * 5 & 6. Full-bleed image with copy overlaid to one side.
 *
 * Used twice: human recognition (copy left) and cruising advertising
 * (copy right). The backdrop bleeds edge to edge; the copy sits at a
 * readable measure over it.
 */
export default function FullBleedFeature({
  title,
  body,
  align,
  imageLabel,
}: {
  title: string
  body: string
  align: 'left' | 'right'
  imageLabel: string
}) {
  return (
    <section className="rp-fit">
      <Slot className="rp-fit-bg" label={imageLabel} />
      <div className={`rp-fit-copy rp-fit-${align}`}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  )
}
