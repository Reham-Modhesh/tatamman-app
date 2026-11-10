import { BadgeCheck, ExternalLink, Globe, ShieldAlert } from 'lucide-react'
import type { MohContent } from '../../types'
import { SOURCE_LABELS } from '../../lib/roles'

const TONES = {
  light: {
    MOH: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    WHO: 'bg-sky-50 text-sky-700 ring-sky-200',
    missing: 'bg-amber-50 text-amber-800 ring-amber-200',
    link: 'text-emerald-700',
  },
  dark: {
    MOH: 'bg-sh-tile text-sh-green-text ring-sh-line/50',
    WHO: 'bg-[#18232f] text-sky-300 ring-sky-400/30',
    missing: 'bg-amber-400/10 text-amber-200 ring-amber-300/30',
    link: 'text-sh-green-text',
  },
}

interface Props {
  content: MohContent
  className?: string
  tone?: 'light' | 'dark'
  showLink?: boolean
}

/** Verification tag: "مصدر معتمد: منصة التوعية الصحية - وزارة الصحة السعودية" plus a link to the page. */
export default function SourceBadge({ content, className = '', tone = 'light', showLink = true }: Props) {
  const t = TONES[tone]
  const ref = content.sourceRef

  if (!ref) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${t.missing} ${className}`}>
        <ShieldAlert className="size-3.5 shrink-0" />
        لا يوجد مصدر رسمي موثّق
      </span>
    )
  }

  const Icon = content.source === 'WHO' ? Globe : BadgeCheck
  const label = SOURCE_LABELS[content.source]
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${t[content.source]}`}>
        <Icon className="size-3.5 shrink-0" />
        مصدر معتمد: {label.full}
      </span>
      {showLink && (
        <a
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          title={ref.pageTitle}
          className={`inline-flex items-center gap-1 text-[11px] font-medium underline-offset-2 hover:underline ${t.link}`}
        >
          <ExternalLink className="size-3" />
          عرض المصدر
        </a>
      )}
    </span>
  )
}
