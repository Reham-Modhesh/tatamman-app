import type { ContentSource, Doctor, DischargeNote, ReviewerRole, Specialty } from '../types'

export const REVIEWER_GROUP_LABEL = 'المثقف الصحي / الطبيب المعالج'

export const REVIEWER_ROLE_LABELS: Record<ReviewerRole, string> = {
  health_educator: 'مثقف صحي',
  attending_physician: 'طبيب معالج',
}

export function reviewerFor(note: DischargeNote, role: ReviewerRole): Doctor {
  return role === 'health_educator' ? note.healthEducator : note.attendingDoctor
}

export const SOURCE_LABELS: Record<ContentSource, { full: string; short: string }> = {
  MOH: { full: 'منصة التوعية الصحية - وزارة الصحة السعودية', short: 'MoH' },
  WHO: { full: 'منظمة الصحة العالمية', short: 'WHO' },
}

export const SPECIALTY_LABELS: Record<Specialty, string> = {
  surgery: 'الجراحة العامة',
  cardiology: 'أمراض القلب',
  endocrinology: 'الغدد الصماء والسكري',
}
