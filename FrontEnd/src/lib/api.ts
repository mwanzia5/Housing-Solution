// ============================================================
//  HomeLink — API Service Layer
//  src/lib/api.ts
//
//  One function per backend operation. Import these in your
//  pages/hooks instead of calling supabase directly.
// ============================================================

import { supabase } from './supabase'
import type {
  Profile,
  ProfileUpdate,
  HousingUnit,
  HousingUnitInsert,
  HousingUnitUpdate,
  Program,
  ProgramInsert,
  ProgramUpdate,
  Application,
  ApplicationInsert,
  ApplicationStatusUpdate,
  Document,
  DocumentInsert,
  AuditLog,
  EligibilityMatch,
} from '../types/supabase'

// ── AUTH ─────────────────────────────────────────────────────

export const auth = {
  /** Sign up a new user. role is stored in user_meta_data for the DB trigger. */
  signUp: async (
    email: string,
    password: string,
    full_name: string,
    role: 'citizen' | 'provider' = 'citizen'
  ) => {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name, role } },
    })
  },

  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),

  signOut: () => supabase.auth.signOut(),

  getSession: () => supabase.auth.getSession(),

  onAuthStateChange: (callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) =>
    supabase.auth.onAuthStateChange(callback),
}

// ── PROFILES ─────────────────────────────────────────────────

export const profiles = {
  /** Fetch the currently logged-in user's profile */
  getOwn: async (): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single()
    if (error) throw error
    return data
  },

  /** Update own profile (citizens / providers) */
  update: async (updates: ProfileUpdate): Promise<Profile> => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user!.id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  /** Admin: fetch all profiles */
  getAll: async (): Promise<Profile[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },
}

// ── HOUSING UNITS ────────────────────────────────────────────

export const housingUnits = {
  /** Citizens: browse available units */
  getAvailable: async (): Promise<HousingUnit[]> => {
    const { data, error } = await supabase
      .from('housing_units')
      .select('*')
      .eq('availability_status', 'available')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Provider: list own units */
  getOwn: async (): Promise<HousingUnit[]> => {
    const { data, error } = await supabase
      .from('housing_units')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Get single unit by ID */
  getById: async (id: string): Promise<HousingUnit> => {
    const { data, error } = await supabase
      .from('housing_units')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  /** Provider: create a new unit */
  create: async (unit: HousingUnitInsert): Promise<HousingUnit> => {
    const { data, error } = await supabase
      .from('housing_units')
      .insert(unit)
      .select()
      .single()
    if (error) throw error
    return data
  },

  /** Provider: update own unit */
  update: async (id: string, updates: HousingUnitUpdate): Promise<HousingUnit> => {
    const { data, error } = await supabase
      .from('housing_units')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  /** Admin: get all units */
  getAll: async (): Promise<HousingUnit[]> => {
    const { data, error } = await supabase
      .from('housing_units')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },
}

// ── PROGRAMS ─────────────────────────────────────────────────

export const programsApi = {
  /** Citizens / Providers: list active programs */
  getActive: async (): Promise<Program[]> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Admin: get all programs */
  getAll: async (): Promise<Program[]> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Admin: create program */
  create: async (program: ProgramInsert): Promise<Program> => {
    const { data, error } = await supabase
      .from('programs')
      .insert(program)
      .select()
      .single()
    if (error) throw error
    return data
  },

  /** Admin: update program */
  update: async (id: string, updates: ProgramUpdate): Promise<Program> => {
    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

// ── APPLICATIONS ─────────────────────────────────────────────

export const applications = {
  /** Citizen: fetch own applications with unit + program details */
  getOwn: async (): Promise<Application[]> => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        housing_units (id, unit_type, location, rent_amount, is_subsidized),
        programs (id, name, description)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Citizen: submit a new application */
  create: async (application: ApplicationInsert): Promise<Application> => {
    const { data, error } = await supabase
      .from('applications')
      .insert(application)
      .select()
      .single()
    if (error) throw error
    return data
  },

  /** Provider: view applications for own units */
  getForOwnUnits: async (): Promise<Application[]> => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        housing_units!inner (id, unit_type, location),
        profiles (id, full_name, phone, household_size, special_needs)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Provider / Admin: update application status */
  updateStatus: async (
    id: string,
    updates: ApplicationStatusUpdate
  ): Promise<Application> => {
    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  /** Admin: get all applications */
  getAll: async (): Promise<Application[]> => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        housing_units (unit_type, location),
        programs (name),
        profiles (full_name)
      `)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },
}

// ── ELIGIBILITY ENGINE ────────────────────────────────────────

export const eligibility = {
  /**
   * Run the Postgres RPC eligibility matcher.
   * Returns ranked housing units and programs the citizen qualifies for.
   * Citizen must have income_range, household_size, and location set on profile.
   */
  match: async (): Promise<EligibilityMatch[]> => {
    const { data, error } = await supabase.rpc('match_housing_and_programs')
    if (error) throw error
    return data ?? []
  },
}

// ── DOCUMENTS ────────────────────────────────────────────────

export const documents = {
  /**
   * Upload a file to Supabase Storage and record it in the documents table.
   * Storage path: user-documents/{userId}/{documentType}_{timestamp}.{ext}
   */
  upload: async (
    userId: string,
    file: File,
    documentType: DocumentInsert['document_type']
  ): Promise<Document> => {
    const ext = file.name.split('.').pop()
    const filePath = `${userId}/${documentType}_${Date.now()}.${ext}`

    const { error: storageError } = await supabase.storage
      .from('user-documents')
      .upload(filePath, file, { upsert: false })

    if (storageError) throw storageError

    const { data, error } = await supabase
      .from('documents')
      .insert({ user_id: userId, file_path: filePath, document_type: documentType })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /** Fetch own documents */
  getOwn: async (): Promise<Document[]> => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('uploaded_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },

  /** Get a signed download URL (valid 60 min) */
  getDownloadUrl: async (filePath: string): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('user-documents')
      .createSignedUrl(filePath, 3600)
    if (error) throw error
    return data.signedUrl
  },

  /** Admin: update verification status */
  verify: async (
    id: string,
    status: VerificationStatus
  ): Promise<Document> => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('documents')
      .update({ verification_status: status, verified_by: user!.id })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

// fix missing import
type VerificationStatus = 'pending' | 'verified' | 'rejected'

// ── ANALYTICS (Admin only) ────────────────────────────────────

export const analytics = {
  /** Applications grouped by location */
  byLocation: async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('housing_units(location)')
    if (error) throw error
    const counts: Record<string, number> = {}
    data?.forEach((a: any) => {
      const loc = a.housing_units?.location ?? 'Unknown'
      counts[loc] = (counts[loc] ?? 0) + 1
    })
    return Object.entries(counts).map(([location, count]) => ({ location, count }))
  },

  /** Waitlist count per program */
  waitlistByProgram: async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('programs(name)')
      .eq('status', 'waitlisted')
    if (error) throw error
    const counts: Record<string, number> = {}
    data?.forEach((a: any) => {
      const name = a.programs?.name ?? 'No Program'
      counts[name] = (counts[name] ?? 0) + 1
    })
    return Object.entries(counts).map(([program, count]) => ({ program, count }))
  },

  /** Housing availability by region */
  unitsByRegion: async () => {
    const { data, error } = await supabase
      .from('housing_units')
      .select('location, availability_status')
    if (error) throw error
    const map: Record<string, Record<string, number>> = {}
    data?.forEach((u: any) => {
      if (!map[u.location]) map[u.location] = { available: 0, occupied: 0, reserved: 0 }
      map[u.location][u.availability_status]++
    })
    return Object.entries(map).map(([location, counts]) => ({ location, ...counts }))
  },

  /** Audit log (admin only) */
  getAuditLogs: async (): Promise<AuditLog[]> => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('changed_at', { ascending: false })
      .limit(200)
    if (error) throw error
    return data ?? []
  },
}