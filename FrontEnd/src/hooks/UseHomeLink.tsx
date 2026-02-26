// ============================================================
//  HomeLink — Custom Hooks
//  src/hooks/useHomeLink.ts
//
//  One hook per data domain. Each hook manages:
//    - data state
//    - loading / error state
//    - CRUD actions
// ============================================================

import { useState, useEffect, useCallback } from 'react'
import {
  housingUnits,
  programsApi,
  applications,
  eligibility,
  documents,
  analytics,
} from '../lib/api'
import type {
  HousingUnit,
  HousingUnitInsert,
  HousingUnitUpdate,
  Program,
  ProgramInsert,
  Application,
  ApplicationInsert,
  ApplicationStatusUpdate,
  Document,
  EligibilityMatch,
} from '../types/supabase'
import { useAuth } from '../context/Authcontext'

// ── Generic async state helper ────────────────────────────────
function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result)
    } catch (err: any) {
      setError(err.message ?? 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => { run() }, [run])

  return { data, loading, error, refetch: run }
}

// ── Housing Units ────────────────────────────────────────────

/** For Housing.tsx — citizens browsing available units */
export function useAvailableUnits() {
  return useAsync<HousingUnit[]>(() => housingUnits.getAvailable())
}

/** For ProviderDashboard.tsx — provider's own units */
export function useProviderUnits() {
  const { data, loading, error, refetch } = useAsync<HousingUnit[]>(
    () => housingUnits.getOwn()
  )

  const createUnit = async (unit: HousingUnitInsert) => {
    await housingUnits.create(unit)
    refetch()
  }

  const updateUnit = async (id: string, updates: HousingUnitUpdate) => {
    await housingUnits.update(id, updates)
    refetch()
  }

  return { units: data ?? [], loading, error, createUnit, updateUnit, refetch }
}

/** For AdminDashboard.tsx */
export function useAllUnits() {
  return useAsync<HousingUnit[]>(() => housingUnits.getAll())
}

// ── Programs ─────────────────────────────────────────────────

/** For Programs.tsx — citizens / providers */
export function useActivePrograms() {
  return useAsync<Program[]>(() => programsApi.getActive())
}

/** For AdminDashboard.tsx */
export function useAllPrograms() {
  const { data, loading, error, refetch } = useAsync<Program[]>(
    () => programsApi.getAll()
  )

  const createProgram = async (program: ProgramInsert) => {
    await programsApi.create(program)
    refetch()
  }

  const updateProgram = async (id: string, updates: Partial<ProgramInsert>) => {
    await programsApi.update(id, updates)
    refetch()
  }

  return { programs: data ?? [], loading, error, createProgram, updateProgram, refetch }
}

// ── Applications ─────────────────────────────────────────────

/** For CitizenDashboard.tsx */
export function useCitizenApplications() {
  const { data, loading, error, refetch } = useAsync<Application[]>(
    () => applications.getOwn()
  )

  const apply = async (application: ApplicationInsert) => {
    await applications.create(application)
    refetch()
  }

  return { apps: data ?? [], loading, error, apply, refetch }
}

/** For ProviderDashboard.tsx */
export function useProviderApplications() {
  const { data, loading, error, refetch } = useAsync<Application[]>(
    () => applications.getForOwnUnits()
  )

  const updateStatus = async (id: string, updates: ApplicationStatusUpdate) => {
    await applications.updateStatus(id, updates)
    refetch()
  }

  return { apps: data ?? [], loading, error, updateStatus, refetch }
}

/** For AdminDashboard.tsx */
export function useAllApplications() {
  const { data, loading, error, refetch } = useAsync<Application[]>(
    () => applications.getAll()
  )

  const updateStatus = async (id: string, updates: ApplicationStatusUpdate) => {
    await applications.updateStatus(id, updates)
    refetch()
  }

  return { apps: data ?? [], loading, error, updateStatus, refetch }
}

// ── Eligibility ───────────────────────────────────────────────

/** For Eligibility.tsx */
export function useEligibility() {
  const { profile } = useAuth()
  const profileComplete =
    !!profile?.income_range && !!profile?.household_size && !!profile?.location

  const { data, loading, error, refetch } = useAsync<EligibilityMatch[]>(
    () => (profileComplete ? eligibility.match() : Promise.resolve([])),
    [profileComplete]
  )

  return {
    matches: data ?? [],
    loading,
    error,
    profileComplete,
    refetch,
  }
}

// ── Documents ────────────────────────────────────────────────

/** For CitizenDashboard.tsx document upload section */
export function useDocuments() {
  const { user } = useAuth()
  const { data, loading, error, refetch } = useAsync<Document[]>(
    () => documents.getOwn()
  )

  const upload = async (
    file: File,
    documentType: Document['document_type']
  ) => {
    if (!user) throw new Error('Not authenticated')
    await documents.upload(user.id, file, documentType)
    refetch()
  }

  const getDownloadUrl = (filePath: string) => documents.getDownloadUrl(filePath)

  return {
    docs: data ?? [],
    loading,
    error,
    upload,
    getDownloadUrl,
    refetch,
  }
}

// ── Analytics ────────────────────────────────────────────────

/** For AdminDashboard.tsx */
export function useAnalytics() {
  const [locationData, setLocationData] = useState<any[]>([])
  const [waitlistData, setWaitlistData] = useState<any[]>([])
  const [unitsByRegion, setUnitsByRegion] = useState<any[]>([])
  const [auditLogs, setAuditLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const [loc, waitlist, units, logs] = await Promise.all([
          analytics.byLocation(),
          analytics.waitlistByProgram(),
          analytics.unitsByRegion(),
          analytics.getAuditLogs(),
        ])
        setLocationData(loc)
        setWaitlistData(waitlist)
        setUnitsByRegion(units)
        setAuditLogs(logs)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { locationData, waitlistData, unitsByRegion, auditLogs, loading, error }
}