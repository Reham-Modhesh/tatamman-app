import { useEffect, useId, useRef, useState } from 'react'
import { Headphones, Pause, Play, Square } from 'lucide-react'

const START_EVENT = 'tatammam:tts-start'
const RATES = [0.75, 1, 1.25]

interface Props {
  text: string
  label?: string
}

/** Text-to-speech bar that reads approved text aloud (browser Web Speech API). */
export default function AudioPlayer({ text, label = 'استمع' }: Props) {
  const id = useId()
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [progress, setProgress] = useState(0)
  const [rate, setRate] = useState(1)
  const [hasArabicVoice, setHasArabicVoice] = useState(true)
  const activeRef = useRef(false)

  useEffect(() => {
    if (!supported) return
    const synth = window.speechSynthesis
    const checkVoices = () => {
      const voices = synth.getVoices()
      if (voices.length) setHasArabicVoice(voices.some((v) => v.lang.toLowerCase().startsWith('ar')))
    }
    checkVoices()
    synth.addEventListener('voiceschanged', checkVoices)

    // Only one player speaks at a time.
    const onOtherStart = (e: Event) => {
      if ((e as CustomEvent<string>).detail === id) return
      activeRef.current = false
      setStatus('idle')
      setProgress(0)
    }
    window.addEventListener(START_EVENT, onOtherStart)

    return () => {
      synth.removeEventListener('voiceschanged', checkVoices)
      window.removeEventListener(START_EVENT, onOtherStart)
      if (activeRef.current) synth.cancel()
    }
  }, [id, supported])

  const finish = () => {
    if (!activeRef.current) return
    activeRef.current = false
    setStatus('idle')
    setProgress(0)
  }

  const play = () => {
    const synth = window.speechSynthesis
    if (status === 'paused') {
      synth.resume()
      setStatus('playing')
      return
    }
    window.dispatchEvent(new CustomEvent(START_EVENT, { detail: id }))
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ar-SA'
    utterance.rate = rate
    const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith('ar'))
    if (voice) utterance.voice = voice
    utterance.onboundary = (e) => setProgress(Math.min(1, (e.charIndex + (e.charLength || 0)) / text.length))
    utterance.onend = finish
    utterance.onerror = finish
    activeRef.current = true
    synth.speak(utterance)
    setStatus('playing')
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setStatus('paused')
  }

  const stop = () => {
    activeRef.current = false
    window.speechSynthesis.cancel()
    setStatus('idle')
    setProgress(0)
  }

  if (!supported) {
    return <div className="rounded-sh-btn bg-sh-raised px-3 py-2 text-xs text-sh-subtle">القراءة الصوتية غير مدعومة في هذا المتصفح</div>
  }

  return (
    <div className="rounded-sh-btn bg-sh-raised p-2.5 ring-1 ring-sh-line/40">
      <div className="flex items-center gap-2">
        <button
          onClick={status === 'playing' ? pause : play}
          aria-label={status === 'playing' ? 'إيقاف مؤقت' : 'تشغيل القراءة الصوتية'}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-sh-green text-white transition hover:opacity-90"
        >
          {status === 'playing' ? <Pause className="size-4" /> : <Play className="size-4 -scale-x-100" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-xs font-medium text-sh-muted">
            <Headphones className="size-3.5" />
            {status === 'idle' ? label : status === 'playing' ? 'جارٍ القراءة…' : 'متوقف مؤقتاً'}
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sh-pill">
            <div className="h-full rounded-full bg-sh-green transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
        {status !== 'idle' && (
          <button onClick={stop} aria-label="إيقاف" className="grid size-7 place-items-center rounded-full text-sh-muted hover:bg-sh-pill">
            <Square className="size-3.5" />
          </button>
        )}
        <div className="flex rounded-lg bg-sh-pill p-0.5">
          {RATES.map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              disabled={status !== 'idle'}
              aria-pressed={rate === r}
              className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${rate === r ? 'bg-sh-segment-active text-sh-green-text' : 'text-sh-subtle disabled:opacity-50'}`}
            >
              <span dir="ltr">{r}x</span>
            </button>
          ))}
        </div>
      </div>
      {!hasArabicVoice && <p className="mt-1.5 text-[11px] text-sh-subtle">لا يتوفر صوت عربي في هذا المتصفح، قد تختلف جودة النطق.</p>}
    </div>
  )
}
