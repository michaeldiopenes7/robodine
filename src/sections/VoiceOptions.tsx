import { useEffect, useRef, useState } from 'react'
import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import Waveform from '../components/Waveform'
import voiceRobot from '../assets/voice-robot.png'
import type { Product } from '../products'

/*
 * 4. Voice options — the robot standing over a waveform, with a card per
 * voice below it.
 *
 * Selecting a card plays that sample and stops any other; selecting the
 * playing card stops it. Only one clip is ever audible, and the waveform
 * animates only while something is playing.
 *
 * Samples live in public/media so they stream rather than being bundled.
 * A voice with no file yet still selects — the card just does not sound.
 */
export default function VoiceOptions({ product }: { product: Product }) {
  const feature = product.voice
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Stop playback if the section unmounts mid-clip.
  useEffect(() => () => audioRef.current?.pause(), [])

  if (!feature) return null

  function toggle(id: string) {
    const current = audioRef.current
    if (current) {
      current.pause()
      current.currentTime = 0
    }

    if (playing === id) {
      setPlaying(null)
      return
    }

    const next = new Audio(`/media/voice-${id}.mp3`)
    next.addEventListener('ended', () => setPlaying(null))
    // A missing or unplayable file should not leave the card stuck "playing".
    next.play().catch(() => setPlaying(null))
    audioRef.current = next
    setPlaying(id)
  }

  return (
    <Band>
      <SectionHead title={feature.title} body={feature.body} />

      <div className="rp-audio-stage">
        <Waveform active={playing !== null} />
        <div className="rp-audio-robot">
          <img
            src={voiceRobot}
            alt={`${product.name} service robot, front view`}
            width={357}
            height={547}
          />
        </div>
      </div>

      <div className="rp-audio-cards">
        {feature.voices.map((v) => {
          const isOn = playing === v.id
          return (
            <button
              key={v.id}
              type="button"
              className={'rp-audio-card' + (isOn ? ' is-on' : '')}
              aria-pressed={isOn}
              onClick={() => toggle(v.id)}
            >
              <span className="rp-audio-name">{v.label}</span>
              <span className="rp-audio-bar" aria-hidden="true">
                {isOn ? (
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1.2" />
                    <rect x="14" y="5" width="4" height="14" rx="1.2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
                    <path d="M15.5 9.5a4 4 0 0 1 0 5" />
                    <path d="M18 7a7.5 7.5 0 0 1 0 10" />
                  </svg>
                )}
              </span>
              <span className="rp-audio-time">{v.length}</span>
              <span className="rp-audio-note">{v.note}</span>
            </button>
          )
        })}
      </div>
    </Band>
  )
}
