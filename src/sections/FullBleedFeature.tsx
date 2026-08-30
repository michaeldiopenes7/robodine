/*
 * 5 & 6. Full-bleed image with copy overlaid to one side.
 *
 * Used twice: human recognition (copy left) and cruising advertising
 * (copy right). The backdrop bleeds edge to edge; the copy sits at a
 * readable measure over it, on the side away from the subject.
 */
export default function FullBleedFeature({
  title,
  body,
  align,
  image,
  imageAlt,
  overlay,
}: {
  title: string
  body: string
  align: 'left' | 'right'
  image: string
  imageAlt: string
  /* Optional effect layer composited over the photograph — a transparent
     PNG that fades in and out on a loop. Decorative, so it carries no alt. */
  overlay?: string
}) {
  return (
    <section className="rp-fit">
      {/* The image and its overlay share one box so they scale as a single
          unit. Without this the photo scales by object-fit: cover while the
          overlay resolves against the section, and the two drift apart at
          every aspect ratio but the one they were positioned at. */}
      <div className="rp-fit-media">
        <img className="rp-fit-bg" src={image} alt={imageAlt} width={1920} height={950} />
        {overlay && <img className="rp-fit-scan" src={overlay} alt="" aria-hidden="true" />}
      </div>
      <div className={`rp-fit-copy rp-fit-${align}`}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  )
}
