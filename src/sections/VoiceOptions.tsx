import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [levels, setLevels] = useState<number[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const frameRef = useRef<number | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const stopCurrent = useCallback((resetLevels = true) => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
    sourceRef.current?.disconnect()
    analyserRef.current?.disconnect()
    sourceRef.current = null
    analyserRef.current = null
    audioRef.current = null
    if (resetLevels) setLevels([])
  }, [])

  // Stop playback if the section unmounts mid-clip.
  useEffect(() => () => stopCurrent(false), [stopCurrent])

  if (!feature) return null

  function analyse(audio: HTMLAudioElement) {
    const ctx = audioCtxRef.current ?? new AudioContext()
    audioCtxRef.current = ctx
    void ctx.resume()

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.52

    const source = ctx.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    sourceRef.current = source
    analyserRef.current = analyser

    const bins = new Uint8Array(analyser.frequencyBinCount)
    const wave = new Uint8Array(analyser.fftSize)
    const nextLevels = Array.from({ length: 48 }, () => 0)

    const tick = () => {
      analyser.getByteFrequencyData(bins)
      analyser.getByteTimeDomainData(wave)

      let rms = 0
      for (let i = 0; i < wave.length; i += 1) {
        const centered = (wave[i] - 128) / 128
        rms += centered * centered
      }
      rms = Math.sqrt(rms / wave.length)

      for (let i = 0; i < nextLevels.length; i += 1) {
        const freqStart = 2 + Math.floor((i / nextLevels.length) * (bins.length - 14))
        const freqEnd = Math.min(bins.length, freqStart + 6)
        let freqPeak = 0
        for (let j = freqStart; j < freqEnd; j += 1) freqPeak = Math.max(freqPeak, bins[j])

        const waveStart = Math.floor((i / nextLevels.length) * wave.length)
        const waveEnd = Math.min(wave.length, waveStart + Math.ceil(wave.length / nextLevels.length) + 1)
        let wavePeak = 0
        for (let j = waveStart; j < waveEnd; j += 1) {
          wavePeak = Math.max(wavePeak, Math.abs(wave[j] - 128) / 128)
        }

        const freq = Math.max(0, (freqPeak - 18) / 210)
        const raw = Math.max(freq, wavePeak * 1.8, rms * 2.2)
        const target = Math.min(1, Math.pow(raw, 0.52) * 1.45)
        const easing = target > nextLevels[i] ? 0.24 : 0.14
        nextLevels[i] += (target - nextLevels[i]) * easing
      }

      setLevels([...nextLevels])
      frameRef.current = requestAnimationFrame(tick)
    }

    tick()
  }

  function toggle(id: string) {
    stopCurrent()

    if (playing === id) {
      setPlaying(null)
      return
    }

    const next = new Audio(`/media/voice-${id}.mp3`)
    next.addEventListener('ended', () => {
      stopCurrent()
      setPlaying(null)
    })
    // A missing or unplayable file should not leave the card stuck "playing".
    analyse(next)
    next.play().catch(() => {
      stopCurrent()
      setPlaying(null)
    })
    audioRef.current = next
    setPlaying(id)
  }

  return (
    <Band>
      <SectionHead title={feature.title} body={feature.body} />

      <div className="rp-audio-stage">
        <Waveform active={playing !== null} levels={levels} />
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
