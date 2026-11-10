import notesJson from './dischargeNotes.json'
import contentJson from './mohContent.json'
import type { DischargeNote, MohContent } from '../types'

export const dischargeNotes = notesJson as DischargeNote[]
export const mohContent = contentJson as MohContent[]
