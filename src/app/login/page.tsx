'use client'

import { createClient } from '@/lib/supabase/client'
import { Gamepad2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getURL } from '@/lib/utils/url'


export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const GOOGLE_CLIENT_ID = '313123590702-lb7fjsbbqt83t3ljocvpf5la58uqmir4.apps.googleusercontent.com'

  const nonceRef = useRef<string | undefined>(undefined)

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('error') === 'unauthorized_domain') {
        setError('Please use your @felice.ed.jp workspace account.')
      }

      // Configure Google One Tap callback
      ;(window as any).handleGoogleCredential = async (response: any) => {
        setLoading(true)
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: nonceRef.current,
        })
        
        if (error) {
          setError(error.message)
          setLoading(false)
        } else {
          router.push('/')
          router.refresh()
        }
      }

      // Inject Google SDK for One Tap auto-login
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = async () => {
        const google = (window as any).google
        if (google) {
          // Generate nonce for Supabase auth verification
          const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
          const encoder = new TextEncoder();
          const encodedNonce = encoder.encode(nonce);
          const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
          
          nonceRef.current = nonce;

          google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (window as any).handleGoogleCredential,
            hosted_domain: 'felice.ed.jp', // Ensures workspace boundary
            auto_select: true, // Enables auto-login attempt
            nonce: hashedNonce,
          })
          google.accounts.id.prompt()
        }
      }
      document.body.appendChild(script)

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [router])

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}/auth/callback`,
        queryParams: {
          hd: 'felice.ed.jp'
        }
      }
    })

    if (error) {
        setError(error.message)
        setLoading(false)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '1rem',
      fontFamily: 'Inter, system-ui, sans-serif' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '430px', 
        backgroundColor: '#1e293b', 
        borderRadius: '16px', 
        padding: '3rem 2rem', 
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Gamepad2 size={36} color="#4ade80" style={{ filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.5))' }} />
          <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 700, color: '#4ade80', textShadow: '0 0 10px rgba(74, 222, 128, 0.3)' }}>
            Computer Class
          </h1>
        </div>
        
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Sign in with your school account to access
        </p>

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          backgroundColor: 'rgba(20, 83, 45, 0.5)', 
          border: '1px solid rgba(34, 197, 94, 0.3)', 
          padding: '0.5rem 1.25rem', 
          borderRadius: '8px', 
          color: '#86efac', 
          fontSize: '0.85rem', 
          marginBottom: '3rem' 
        }}>
          <span>🏫</span> @felice.ed.jp accounts only
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#ff8a8a', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <button 
          onClick={handleLogin} 
          disabled={loading}
          style={{ 
            width: '100%', 
            backgroundColor: '#1d4ed8',
            border: 'none', 
            borderRadius: '4px', 
            padding: '2px', 
            display: 'flex', 
            alignItems: 'center',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <div style={{ padding: '0.7rem 1.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.1rem' }}>👤</span>
          </div>
          
          <div style={{ flexGrow: 1, color: 'white', fontWeight: 600, textAlign: 'left', fontSize: '0.95rem' }}>
            {loading ? 'Please wait...' : 'Sign In with Google'}
          </div>

          <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </button>

      </div>
    </div>
  )
}
