const LOCALE = 'ar-SA-u-ca-gregory-nu-latn'

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(LOCALE, opts).format(new Date(iso))
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

/** Formats "HH:mm" as a 12-hour Arabic time, e.g. "9:30 ص". */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h < 12 ? 'ص' : 'م'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function daysUntil(iso: string, from = new Date()) {
  const target = new Date(iso + 'T00:00:00')
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  return Math.round((target.getTime() - today.getTime()) / 86_400_000)
}

export function relativeDayLabel(days: number) {
  if (days < 0) return 'موعد سابق'
  if (days === 0) return 'اليوم'
  if (days === 1) return 'غداً'
  if (days === 2) return 'بعد يومين'
  if (days <= 10) return `بعد ${days} أيام`
  return `بعد ${days} يوماً`
}
