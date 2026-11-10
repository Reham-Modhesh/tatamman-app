import type { ContentType, EntityType } from '../types'

export const ENTITY_STYLES: Record<EntityType, { label: string; mark: string; chip: string }> = {
  diagnosis: { label: 'تشخيص', mark: 'bg-violet-100 text-violet-900 ring-violet-300', chip: 'bg-violet-50 text-violet-700 ring-violet-200' },
  procedure: { label: 'إجراء', mark: 'bg-teal-100 text-teal-900 ring-teal-300', chip: 'bg-teal-50 text-teal-700 ring-teal-200' },
  medication: { label: 'دواء', mark: 'bg-sky-100 text-sky-900 ring-sky-300', chip: 'bg-sky-50 text-sky-700 ring-sky-200' },
  instruction: { label: 'تعليمات', mark: 'bg-amber-100 text-amber-900 ring-amber-300', chip: 'bg-amber-50 text-amber-700 ring-amber-200' },
  red_flag: { label: 'علامة خطر', mark: 'bg-rose-100 text-rose-900 ring-rose-300', chip: 'bg-rose-50 text-rose-700 ring-rose-200' },
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  article: 'مقال',
  video: 'فيديو',
  checklist: 'قائمة تحقق',
  infographic: 'إنفوجرافيك',
}
