import { useEffect, useState } from 'react'
import { MonitorCog } from 'lucide-react'
import type { DischargeNote, KitState, MohContent, ReviewerRole } from '../../types'
import { matchContent } from '../../lib/matching'
import AiMatchingEngine, { ANALYSIS_DONE } from './AiMatchingEngine'
import ApprovalPanel from './ApprovalPanel'
import CaseList from './CaseList'
import EhrRecord from './EhrRecord'

interface Props {
  notes: DischargeNote[]
  library: MohContent[]
  kits: Record<string, KitState>
  selectedId: string
  onSelect: (id: string) => void
  onToggleContent: (noteId: string, contentId: string) => void
  onPublish: (noteId: string, role: ReviewerRole) => void
  onRevoke: (noteId: string) => void
  onOpenPatientView: () => void
}

export default function ProviderPortal(props: Props) {
  const { notes, kits, selectedId, onSelect } = props
  const note = notes.find((n) => n.id === selectedId) ?? notes[0]

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[300px_1fr]">
      <div role="note" className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 lg:col-span-2">
        <span className="shrink-0 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-amber-950">Demo</span>
        <MonitorCog className="mt-0.5 size-4 shrink-0 text-amber-600" />
        <p className="font-medium">
          شاشة محاكاة تجريبية (Demo) - في البيئة الفعلية يتم الربط المباشر مع السجل الطبي الإلكتروني للمستشفى (EHR/HIS) عبر REST APIs
        </p>
      </div>
      <CaseList notes={notes} kits={kits} selectedId={note.id} onSelect={onSelect} />
      {/* Keyed so the analysis animation restarts for each record. */}
      <CaseWorkspace key={note.id} {...props} note={note} />
    </div>
  )
}

function CaseWorkspace({ note, library, kits, onToggleContent, onPublish, onRevoke, onOpenPatientView }: Props & { note: DischargeNote }) {
  const kit = kits[note.id]
  const alreadyPublished = kit.status === 'published'
  const [stage, setStage] = useState(alreadyPublished ? ANALYSIS_DONE : 0)
  const [run, setRun] = useState(alreadyPublished ? 0 : 1)

  useEffect(() => {
    if (run === 0) return
    const timers = Array.from({ length: ANALYSIS_DONE }, (_, i) => window.setTimeout(() => setStage(i + 1), (i + 1) * 800))
    return () => timers.forEach(clearTimeout)
  }, [run])

  const matches = matchContent(note, library)

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[1fr_340px]">
      <div className="min-w-0 space-y-6">
        <EhrRecord note={note} highlight={stage >= 2} />
        <AiMatchingEngine
          note={note}
          stage={stage}
          matches={matches}
          librarySize={library.length}
          selectedIds={kit.selectedContentIds}
          locked={alreadyPublished}
          onToggle={(id) => onToggleContent(note.id, id)}
          onRerun={() => {
            setStage(0)
            setRun((r) => r + 1)
          }}
        />
      </div>
      <div>
        <ApprovalPanel
          note={note}
          kit={kit}
          analysisDone={stage >= ANALYSIS_DONE}
          onPublish={(role) => onPublish(note.id, role)}
          onRevoke={() => onRevoke(note.id)}
          onOpenPatientView={onOpenPatientView}
        />
      </div>
    </div>
  )
}
