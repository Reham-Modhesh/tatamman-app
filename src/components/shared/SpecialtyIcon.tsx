import { Droplet, HeartPulse, Scissors, type LucideProps } from 'lucide-react'
import type { Specialty } from '../../types'

const ICONS = { surgery: Scissors, cardiology: HeartPulse, endocrinology: Droplet } as const

export const SPECIALTY_TONES: Record<Specialty, string> = {
  surgery: 'bg-sky-50 text-sky-700 ring-sky-200',
  cardiology: 'bg-rose-50 text-rose-700 ring-rose-200',
  endocrinology: 'bg-amber-50 text-amber-700 ring-amber-200',
}

export default function SpecialtyIcon({ specialty, ...props }: { specialty: Specialty } & LucideProps) {
  const Icon = ICONS[specialty]
  return <Icon {...props} />
}
