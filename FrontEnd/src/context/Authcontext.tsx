// ============================================================
//  HomeLink — Auth Context
//  src/context/AuthContext.tsx
//
//  Wraps the whole app. Provides:
//    - current Supabase session
//    - decoded profile (with role)
//    - loading state
// ============================================================

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { profiles } from '../lib/api'
import type { Profile } from '../types/supabase'

interface AuthContextValue {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
  isProvider: boolean
  isCitizen: boolean
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isProvider: false,
  isCitizen: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) fetchProfile()
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      if (newSession) fetchProfile()
      else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async () => {
    try {
      const p = await profiles.getOwn()
      setProfile(p)
    } catch (err) {
      console.error('Failed to load profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const role = profile?.role ?? null

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        isAdmin: role === 'admin',
        isProvider: role === 'provider',
        isCitizen: role === 'citizen',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)