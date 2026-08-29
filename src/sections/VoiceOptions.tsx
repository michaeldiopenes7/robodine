import { useState } from 'react'
import Band from '../components/Band'
import SectionHead from '../components/SectionHead'
import Slot from '../components/Slot'
import type { Product } from '../products'

/*
 * 4. Voice options — robot over a waveform backdrop, then one card per voice.
 *
 * Cards are a radio group: selecting one is what would start its sample once
 * audio files are wired in. Products without a voice feature skip this section.
 */
export default function VoiceOptions({ product }: { product: Product }) {
  const voiceFeature = product.voice
  const [voice, setVoice] = useState(voiceFeature?.voices[0].id ?? '')

  if (!voiceFeature) return null

  return (
    <Band>
      <SectionHead title={voiceFeature.title} body={voiceFeature.body} />

      <div className="rp-audio-stage">
        <Slot className="rp-audio-wave" label="Waveform backdrop" />
        <div className="rp-audio-robot">
          <Slot ratio="3 / 4" label={`Front render — ${product.name}`} />
        </div>
      </div>

      <div className="rp-audio-cards" role="radiogroup" aria-label="Voice profile">
        {voiceFeature.voices.map((v) => (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={voice === v.id}
            className={'rp-audio-card' + (voice === v.id ? ' is-on' : '')}
            onClick={() => setVoice(v.id)}
          >
            <span className="rp-audio-bar" aria-hidden="true">
              {voice === v.id ? (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1.2" />
                  <rect x="14" y="5" width="4" height="14" rx="1.2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M8 5.6v12.8a1 1 0 0 0 1.5.87l10.4-6.4a1 1 0 0 0 0-1.74L9.5 4.73A1 1 0 0 0 8 5.6z" />
                </svg>
              )}
            </span>
            <span className="rp-audio-name">{v.label}</span>
            <span className="rp-audio-time">{v.length}</span>
            <span className="rp-audio-note">{v.note}</span>
          </button>
        ))}
      </div>
      <p className="rp-fine">
        Voice samples to be added — drop audio files in and wire them to these buttons.
      </p>
    </Band>
  )
}
