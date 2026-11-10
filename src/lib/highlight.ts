import type { ExtractedEntity } from '../types'

export interface Segment {
  text: string
  entity?: ExtractedEntity
}

/** Splits the raw note into plain and highlighted segments using each entity's evidence span. */
export function segmentText(text: string, entities: ExtractedEntity[]): Segment[] {
  const ranges = entities
    .flatMap((entity) => {
      const start = text.indexOf(entity.evidence)
      return start < 0 ? [] : [{ start, end: start + entity.evidence.length, entity }]
    })
    .sort((a, b) => a.start - b.start)

  const out: Segment[] = []
  let pos = 0
  for (const r of ranges) {
    if (r.start < pos) continue
    if (r.start > pos) out.push({ text: text.slice(pos, r.start) })
    out.push({ text: text.slice(r.start, r.end), entity: r.entity })
    pos = r.end
  }
  if (pos < text.length) out.push({ text: text.slice(pos) })
  return out
}
