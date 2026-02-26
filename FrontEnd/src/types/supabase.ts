// ============================================================
//  HomeLink — src/types/supabase.ts
//  TypeScript types mirroring the PostgreSQL schema exactly.
// ============================================================

// ── Enums ────────────────────────────────────────────────────

export type UserRole =
  | 'citizen'
  | 'provider'
  | 'admin'

export type ApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'waitlisted'
  | 'rejected'

export type AvailabilityStatus =
  | 'available'
  | 'occupied'
  | 'reserved'

export type VerificationStatus =
  | 'pending'
  | 'verified'
  | 'rejected'

export type EmploymentType =
  | 'employed'
  | 'self_employed'
  | 'unemployed'
  | 'student'
  | 'retired'

export type UnitType =
  | 'bedsitter'
  | '1_bedroom'
  | '2_bedroom'
  | '3_bedroom'
  | '4_bedroom_plus'

export type DocumentType =
  | 'national_id'
  | 'payslip'
  | 'employer_letter'
  | 'proof_of_residence'

// ── Table Row Types ──────────────────────────────────────────

export interface Profile {
  id: string                        // uuid — matches auth.users.id
  role: UserRole
  full_name: string
  phone: string | null
  /**
   * PostgreSQL numrange serialised as a string by Supabase, e.g. "[10000,30000)"
   * Use the helpers below to read/write it safely.
   */
  income_range: string | null
  household_size: number | null
  location: string | null
  employment_type: EmploymentType | null
  special_needs: string | null      // comma-separated tags or free text
  created_at: string                // ISO 8601
  updated_at: string
}

export interface HousingUnit {
  id: string
  provider_id: string               // references profiles.id
  unit_type: UnitType
  location: string
  rent_amount: number
  deposit_amount: number
  is_subsidized: boolean
  availability_status: AvailabilityStatus
  max_occupants: number
  description: string | null
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  name: string
  description: string | null
  income_min: number
  income_max: number
  priority_groups: string[] | null  // e.g. ['elderly', 'disabled', 'single_mother']
  location_target: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  citizen_id: string                // references profiles.id
  housing_unit_id: string | null    // references housing_units.id
  program_id: string | null         // references programs.id
  status: ApplicationStatus
  decision_reason: string | null
  created_at: string
  updated_at: string
  // ── Joined relations (populated by Supabase .select() with nested selects)
  housing_units?: Pick<HousingUnit, 'id' | 'unit_type' | 'location' | 'rent_amount' | 'is_subsidized'>
  programs?: Pick<Program, 'id' | 'name' | 'description'>
  profiles?: Pick<Profile, 'id' | 'full_name' | 'phone' | 'household_size' | 'special_needs'>
}

export interface Document {
  id: string
  user_id: string                   // references profiles.id
  file_path: string                 // path inside 'user-documents' Storage bucket
  document_type: DocumentType
  verification_status: VerificationStatus
  verified_by: string | null        // admin profile id
  uploaded_at: string
}

export interface AuditLog {
  id: string
  table_name: string
  record_id: string
  changed_by: string | null         // references profiles.id
  old_status: string | null
  new_status: string | null
  change_note: string | null
  changed_at: string
}

// ── RPC Return Type (match_housing_and_programs) ─────────────

export interface EligibilityMatch {
  match_type: 'housing_unit' | 'program'
  match_id: string
  match_name: string
  location: string
  rent_amount: number | null        // null for program matches
  is_subsidized: boolean | null     // null for program matches
  program_name: string | null       // null for direct unit matches
  eligibility_score: number         // 0-100
  notes: string
}

// ── Insert Types (what you send TO Supabase) ─────────────────

export type ProfileInsert = Omit<Profile,
  | 'created_at'
  | 'updated_at'
>

export type ProfileUpdate = Partial<Omit<Profile,
  | 'id'
  | 'created_at'
  | 'updated_at'
>>

export type HousingUnitInsert = Omit<HousingUnit,
  | 'id'
  | 'created_at'
  | 'updated_at'
>

export type HousingUnitUpdate = Partial<HousingUnitInsert>

export type ProgramInsert = Omit<Program,
  | 'id'
  | 'created_at'
  | 'updated_at'
>

export type ProgramUpdate = Partial<ProgramInsert>

export type ApplicationInsert = Pick<Application,
  | 'citizen_id'
  | 'housing_unit_id'
  | 'program_id'
>

export type ApplicationStatusUpdate = Pick<Application,
  | 'status'
  | 'decision_reason'
>

export type DocumentInsert = Pick<Document,
  | 'user_id'
  | 'file_path'
  | 'document_type'
>

export type DocumentVerifyUpdate = Pick<Document,
  | 'verification_status'
  | 'verified_by'
>

// ── numrange Helpers ─────────────────────────────────────────
// PostgreSQL numrange comes back as a string like "[10000,30000)"
// Use these helpers to read and write it cleanly.

/**
 * Parse a Postgres numrange string into { low, high }.
 * Returns null if the value is null or unparseable.
 *
 * @example
 *   parseNumrange("[10000,30000)") // -> { low: 10000, high: 30000 }
 */
export function parseNumrange(value: string | null): { low: number; high: number } | null {
  if (!value) return null
  const match = value.match(/[\[(]([\d.]+),([\d.]+)[\])]/)
  if (!match) return null
  return { low: parseFloat(match[1]), high: parseFloat(match[2]) }
}

/**
 * Format a { low, high } pair into a Postgres numrange string.
 * Uses inclusive lower bound, exclusive upper bound (standard convention).
 *
 * @example
 *   formatNumrange(10000, 30000) // -> "[10000,30000)"
 */
export function formatNumrange(low: number, high: number): string {
  return `[${low},${high})`
}

/**
 * Return the midpoint of a numrange (used as a monthly income proxy).
 */
export function numrangeMidpoint(value: string | null): number | null {
  const parsed = parseNumrange(value)
  if (!parsed) return null
  return (parsed.low + parsed.high) / 2
}

// ── Label Maps (UI display) ──────────────────────────────────

export const UNIT_TYPE_LABELS: Record<UnitType, string> = {
  bedsitter:        'Bedsitter',
  '1_bedroom':      '1 Bedroom',
  '2_bedroom':      '2 Bedrooms',
  '3_bedroom':      '3 Bedrooms',
  '4_bedroom_plus': '4+ Bedrooms',
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  submitted:    'Submitted',
  under_review: 'Under Review',
  approved:     'Approved',
  waitlisted:   'Waitlisted',
  rejected:     'Rejected',
}

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  submitted:    '#3b82f6',
  under_review: '#f59e0b',
  approved:     '#10b981',
  waitlisted:   '#8b5cf6',
  rejected:     '#ef4444',
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  national_id:        'National ID',
  payslip:            'Payslip',
  employer_letter:    'Employer Letter',
  proof_of_residence: 'Proof of Residence',
}

export const VERIFICATION_STATUS_COLORS: Record<VerificationStatus, string> = {
  pending:  '#f59e0b',
  verified: '#10b981',
  rejected: '#ef4444',
}

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  employed:      'Employed',
  self_employed: 'Self-Employed',
  unemployed:    'Unemployed',
  student:       'Student',
  retired:       'Retired',
}