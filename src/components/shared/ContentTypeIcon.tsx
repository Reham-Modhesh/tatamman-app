import { BookOpen, ChartPie, ListChecks, Video, type LucideProps } from 'lucide-react'
import type { ContentType } from '../../types'

const ICONS = { article: BookOpen, video: Video, checklist: ListChecks, infographic: ChartPie } as const

export default function ContentTypeIcon({ type, ...props }: { type: ContentType } & LucideProps) {
  const Icon = ICONS[type]
  return <Icon {...props} />
}
