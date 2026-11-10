import { useState } from 'react'
import { Check, PartyPopper } from 'lucide-react'

export default function ChecklistCard({ items }: { items: string[] }) {
  const [done, setDone] = useState<Set<number>>(new Set())
  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  const pct = Math.round((done.size / items.length) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[12px] text-sh-subtle">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sh-pill">
          <div className="h-full rounded-full bg-sh-green transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span>
          {done.size}/{items.length}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => {
          const checked = done.has(i)
          return (
            <li key={item}>
              <button
                onClick={() => toggle(i)}
                role="checkbox"
                aria-checked={checked}
                className={`flex w-full items-start gap-2.5 rounded-sh-btn p-2.5 text-start text-[14px] transition ${
                  checked ? 'bg-sh-tile text-sh-green-text' : 'bg-sh-raised text-sh-text'
                }`}
              >
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition ${
                    checked ? 'border-sh-green bg-sh-green text-white' : 'border-sh-subtle'
                  }`}
                >
                  {checked && <Check className="size-3.5" strokeWidth={3} />}
                </span>
                <span className={checked ? 'line-through decoration-sh-green/60' : ''}>{item}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {pct === 100 && (
        <div className="flex items-center gap-2 rounded-sh-btn bg-sh-tile p-2.5 text-[14px] font-medium text-sh-green-text">
          <PartyPopper className="size-4" />
          أحسنت! أكملت قائمة اليوم
        </div>
      )}
    </div>
  )
}
