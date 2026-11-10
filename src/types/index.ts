export type View = 'provider' | 'patient'

export interface Medication {
  name: string
  nameAr: string
  dose: string
  frequencyAr: string
  times: string[] // HH:mm reminder times
  durationDays: number
  instructionsAr?: string
}

export interface FollowUpAppointment {
  clinicAr: string
  date: string // ISO date
  time: string // HH:mm
  locationAr?: string
  notesAr?: string
}

export interface Doctor {
  id: string
  nameAr: string
  specialtyAr: string
  licenseNo: string // mock SCFHS license
}

export interface Patient {
  id: string
  nationalIdMasked: string
  nameAr: string
  age: number
  gender: 'male' | 'female'
  phone: string
}

export type CodeSystem = 'ICD-10' | 'CPT'

export interface ClinicalCode {
  system: CodeSystem
  code: string
  /** ICD-10 three/four-character category, e.g. K80.2 for K80.20. */
  category?: string
  categoryDescriptionEn?: string
  descriptionAr: string
  descriptionEn: string
}

export type EntityType = 'diagnosis' | 'procedure' | 'medication' | 'instruction' | 'red_flag'

/** Output of the (simulated) extraction step: a span of the EHR note, labelled. */
export interface ExtractedEntity {
  type: EntityType
  labelAr: string
  code?: string
  evidence: string // exact substring of rawNoteEn
}

export type HomeCareCategory = 'wound' | 'activity' | 'diet' | 'hygiene' | 'pain' | 'monitoring'

export interface HomeCareSection {
  category: HomeCareCategory
  titleAr: string
  itemsAr: string[]
}

export type Specialty = 'surgery' | 'cardiology' | 'endocrinology'

export interface DischargeNote {
  id: string
  caseLabelAr: string
  specialty: Specialty
  hospitalAr: string
  departmentAr: string
  encounterId: string
  admissionDate: string
  dischargeDate: string
  patient: Patient
  attendingDoctor: Doctor
  healthEducator: Doctor
  diagnosis: ClinicalCode
  procedures: ClinicalCode[]
  rawNoteEn: string
  extractedEntities: ExtractedEntity[]
  summaryAr: string
  medications: Medication[]
  warningSignsAr: string[]
  homeCare: HomeCareSection[]
  followUp: FollowUpAppointment[]
}

export type ContentSource = 'MOH' | 'WHO'

/** Where an education item's content comes from on the official platform. */
export interface SourceReference {
  platformAr: string
  sectionPathAr: string[]
  pageTitle: string
  url: string
  lang: 'ar' | 'en'
  lastChecked: string // date the link was last verified
}

export type ContentType = 'article' | 'video' | 'checklist' | 'infographic'

export interface InfographicStep {
  titleAr: string
  textAr: string
}

export interface MohContent {
  id: string
  titleAr: string
  type: ContentType
  categoryAr: string
  codes: string[] // ICD-10 / CPT codes this item is approved for
  bodyAr: string
  checklistAr?: string[]
  stepsAr?: InfographicStep[]
  durationMinutes?: number
  source: ContentSource
  /** null = no verified official page; the item cannot be published to patients. */
  sourceRef: SourceReference | null
  libraryId: string
  lastReviewed: string
}

/** Who signs off the kit: health educator (default) or attending physician. */
export type ReviewerRole = 'health_educator' | 'attending_physician'

export type KitStatus = 'pending_review' | 'published'

/** The physician-reviewed education kit for one discharge record. */
export interface KitState {
  status: KitStatus
  selectedContentIds: string[]
  approvedAt?: string
  approvedBy?: string
  approverRole?: ReviewerRole
}
