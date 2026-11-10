import type { DischargeNote, MohContent } from '../types'

export interface ContentMatch {
  content: MohContent
  matchedCodes: string[]
  /** True only when the item links to a verified official source page. */
  verified: boolean
}

/** Clinical codes extracted from the discharge record (diagnosis + procedures). */
export function noteCodes(note: DischargeNote): string[] {
  return [note.diagnosis.code, ...note.procedures.map((p) => p.code)]
}

/**
 * ICD-10 codes match hierarchically (library code E11 covers note code E11.65);
 * procedure codes must match exactly.
 */
function codeMatches(noteCode: string, libraryCode: string) {
  const isIcd = /^[A-Z]/.test(libraryCode)
  return isIcd ? noteCode.startsWith(libraryCode) : noteCode === libraryCode
}

/**
 * Deterministic retrieval: a library item is suggested only if it was approved
 * for one of the record's codes. Nothing is generated; content is shown verbatim.
 */
export function matchContent(note: DischargeNote, library: MohContent[]): ContentMatch[] {
  const codes = noteCodes(note)
  return library
    .map((content) => ({
      content,
      matchedCodes: content.codes.filter((c) => codes.some((nc) => codeMatches(nc, c))),
      verified: content.sourceRef !== null,
    }))
    .filter((m) => m.matchedCodes.length > 0)
}

/** Default selection: every match that has a verified official source. */
export function defaultSelection(note: DischargeNote, library: MohContent[]): string[] {
  return matchContent(note, library)
    .filter((m) => m.verified)
    .map((m) => m.content.id)
}

export function selectedContent(ids: string[], library: MohContent[]): MohContent[] {
  return ids.map((id) => library.find((c) => c.id === id)).filter((c): c is MohContent => !!c)
}
