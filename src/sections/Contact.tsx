import { useState } from 'react'

/*
 * 12. Contact — closing section: the ask on the left, the form on the right.
 *
 * There is no backend, so a valid submission composes a pre-filled mail to
 * the sales inbox and hands off to the visitor's mail client. Validation
 * runs first so an incomplete enquiry never reaches that step.
 */

const CONTACT_EMAIL = 'info@robodinesolutions.com'

type Fields = {
  firstName: string
  lastName: string
  phone: string
  email: string
  message: string
}

const EMPTY: Fields = { firstName: '', lastName: '', phone: '', email: '', message: '' }

/* Deliberately permissive: something@something.something, no spaces. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (!f.firstName.trim()) e.firstName = 'Enter your first name.'
  if (!f.lastName.trim()) e.lastName = 'Enter your last name.'
  if (!f.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.message.trim()) e.message = 'Tell us what you need.'
  return e
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState(false)

  const set = (key: keyof Fields) => (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((f) => ({ ...f, [key]: ev.target.value }))
    // Clear a field's error as soon as the visitor starts correcting it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }

    const name = `${fields.firstName.trim()} ${fields.lastName.trim()}`
    const body = [
      `Name:    ${name}`,
      `Email:   ${fields.email.trim()}`,
      fields.phone.trim() ? `Phone:   ${fields.phone.trim()}` : null,
      '',
      fields.message.trim(),
    ].filter((line) => line !== null).join('\n')

    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`Service robot enquiry — ${name}`)}` +
      `&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <section className="rp-band rp-band-dark rp-contact" id="contact">
      <div className="rp-inner rp-contact-grid">
        {/* Left rail: the ask, plus the direct routes for people who
            would rather not fill in a form at all. */}
        <div className="rp-contact-pitch">
          <h2>Talk to us about your floor</h2>
          <p>
            Tell us the venue, the shift and what you need carried or greeted,
            and we will come back with a specification, a fleet size and a price.
          </p>

          <dl className="rp-contact-direct">
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
            </div>
            <div>
              <dt>Response time</dt>
              <dd>One business day</dd>
            </div>
          </dl>
        </div>

        {/* Right rail: the form itself, on a raised card. */}
        <form className="rp-form" onSubmit={onSubmit} noValidate>
          <div className="rp-form-row">
            <Field
              id="firstName" label="First Name" value={fields.firstName}
              onChange={set('firstName')} error={errors.firstName} required
            />
            <Field
              id="lastName" label="Last Name" value={fields.lastName}
              onChange={set('lastName')} error={errors.lastName} required
            />
          </div>

          <div className="rp-form-row">
            <Field
              id="phone" label="Phone" type="tel" autoComplete="tel"
              value={fields.phone} onChange={set('phone')} error={errors.phone}
            />
            <Field
              id="email" label="Email" type="email" autoComplete="email"
              value={fields.email} onChange={set('email')} error={errors.email} required
            />
          </div>

          <Field
            id="message" label="Message" textarea value={fields.message}
            onChange={set('message')} error={errors.message} required
          />

          <div className="rp-form-actions">
            <button type="submit" className="btn rp-form-submit">
              Submit
            </button>
            <p className="rp-form-note" role="status">
              {sent
                ? 'Your mail app should have opened with the enquiry ready to send.'
                : 'Opens in your mail app so you can review before sending.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  id, label, value, onChange, error, type = 'text',
  textarea, required, autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  type?: string
  textarea?: boolean
  required?: boolean
  autoComplete?: string
}) {
  const errorId = `${id}-error`
  const shared = {
    id,
    value,
    onChange,
    required,
    autoComplete,
    placeholder: label,
    className: 'rp-field-input',
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className={'rp-field' + (textarea ? ' rp-field-wide' : '')}>
      <label htmlFor={id} className="rp-field-label">
        {label}
        {!required && <span className="rp-field-optional"> (optional)</span>}
      </label>
      {textarea
        ? <textarea {...shared} rows={6} />
        : <input {...shared} type={type} />}
      {error && <p id={errorId} className="rp-field-error">{error}</p>}
    </div>
  )
}
