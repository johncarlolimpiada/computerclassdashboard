'use client'

import { createClient } from '@/lib/supabase/client'
import { MonitorPlay } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('error') === 'unauthorized_domain') {
        setError('Please use your @felice.ed.jp workspace account.')
      }
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          hd: 'felice.ed.jp' // Force hosted domain
        }
      }
    })

    if (error) {
        setError(error.message)
        setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', textAlign: 'center' }}>
        <MonitorPlay size={48} color="var(--accent-color)" style={{ marginBottom: '1rem', display: 'inline-block' }} />
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Computer Class Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem' }}>
          Please sign in with your Felice Google Account
        </p>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#ff8a8a', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <button className="btn-primary" style={{ width: '100%' }} onClick={handleLogin} disabled={loading}>
          {loading ? 'Redirecting...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}
