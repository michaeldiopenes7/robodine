/* Centred title + description, used by most sections. */
export default function SectionHead({ title, body }: { title: string; body?: string }) {
  return (
    <div className="rp-tdi">
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  )
}
