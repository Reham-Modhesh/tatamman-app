import type { InfographicStep } from '../../types'

export default function InfographicCard({ steps }: { steps: InfographicStep[] }) {
  return (
    <ol className="relative space-y-2.5 before:absolute before:inset-y-4 before:start-4 before:w-px before:bg-sh-line/60">
      {steps.map((step, i) => (
        <li key={step.titleAr + i} className="relative flex items-start gap-3">
          <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-sh-green text-[14px] font-bold text-white">
            {i + 1}
          </span>
          <div className="flex-1 rounded-sh-btn bg-sh-raised p-2.5">
            <div className="text-[14px] font-semibold text-sh-text">{step.titleAr}</div>
            <div className="text-[13px] leading-6 text-sh-muted">{step.textAr}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}
