import { Hospital, Smartphone } from 'lucide-react'
import type { View } from '../types'

interface Props {
  view: View
  onChange: (view: View) => void
}

const TABS = [
  { id: 'patient', label: 'تطبيق صحتي - واجهة المريض', short: 'تطبيق صحتي', icon: Smartphone },
  { id: 'provider', label: 'بوابة المستشفى / اعتماد المثقف الصحي', short: 'بوابة المستشفى', icon: Hospital },
] as const

export default function SimulatorBar({ view, onChange }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <div className="text-lg font-bold leading-tight">تطمّن</div>
          <div className="text-xs text-slate-400">وحدة مدمجة داخل تطبيق صحتي</div>
        </div>

        <nav role="tablist" aria-label="تبديل العرض" className="flex gap-1 rounded-xl bg-slate-800 p-1">
          {TABS.map((tab) => {
            const active = view === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => onChange(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
                  active ? 'bg-white text-slate-900 shadow' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <tab.icon className="size-4" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.short}</span>
              </button>
            )
          })}
        </nav>

      </div>
    </header>
  )
}
