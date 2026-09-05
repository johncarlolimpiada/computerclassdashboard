import { createClient } from '@/lib/supabase/server'
import { Category, AppLink, Settings } from '@/types'
import DashboardClient from './DashboardClient'
import WordQuiz from './WordQuiz'
import InstallBanner from './InstallBanner'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const userPromise = supabase.auth.getUser()
  const settingsPromise = supabase.from('settings').select('*').limit(1).single()
  const categoriesPromise = supabase.from('categories').select('*').order('order_idx', { ascending: true })
  const appsPromise = supabase.from('apps').select('*').order('order_idx', { ascending: true })

  // Start profile check as soon as user resolves, overlapping with DB queries
  const profilePromise = userPromise.then(({ data: { user } }) => {
    if (!user || user.email === 'john.limpiada@felice.ed.jp') return null
    return supabase.from('profiles').select('role').eq('id', user.id).single()
  })

  const [
    { data: settingsData },
    { data: categoriesData },
    { data: appsData },
    { data: { user } },
    profileResult,
  ] = await Promise.all([settingsPromise, categoriesPromise, appsPromise, userPromise, profilePromise])

  const settings = settingsData as Settings | null
  const categories = categoriesData as Category[] || []
  const apps = appsData as AppLink[] || []

  if (!user) redirect('/login')

  const isAdmin = user?.email === 'john.limpiada@felice.ed.jp' || profileResult?.data?.role === 'admin'

  return (
    <div style={{ 
      backgroundImage: settings?.background_url ? `url('${settings.background_url}')` : 'var(--background-image)',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <InstallBanner />
        <header className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Computer Class Dashboard</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <WordQuiz />
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem 0.25rem 0.25rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <img 
                  src={user.user_metadata?.avatar_url || user.user_metadata?.picture || `https://ui-avatars.com/api/?name=${user.email}&background=random`} 
                  alt="Profile" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                  referrerPolicy="no-referrer"
                />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {user.user_metadata?.full_name || user.user_metadata?.name || user.email}
                </span>
              </div>
            )}
            {isAdmin && (
              <Link href="/admin" className="btn-primary" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none' }}>
                Admin Panel
              </Link>
            )}
            <form action="/auth/signout" method="POST">
              <button className="btn-primary" style={{ backgroundColor: 'rgba(239, 68, 68, 0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>Sign out</button>
            </form>
          </div>
        </header>


        <DashboardClient categories={categories} apps={apps} />
      </div>
    </div>
  )
}
