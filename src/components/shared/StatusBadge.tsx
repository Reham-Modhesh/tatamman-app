import { CircleCheck, Clock } from 'lucide-react'
import type { KitStatus } from '../../types'

export const STATUS_LABELS: Record<KitStatus, string> = {
  pending_review: 'بانتظار اعتماد الممارس الصحي',
  published: 'تم الاعتماد والنشر إلى تطبيق صحتي',
}

export default function StatusBadge({ status, className = '' }: { status: KitStatus; className?: string }) {
  const published = status === 'published'
  const Icon = published ? CircleCheck : Clock
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        published ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-amber-200'
      } ${className}`}
    >
      <Icon className="size-3.5 shrink-0" />
      {STATUS_LABELS[status]}
    </span>
  )
}
