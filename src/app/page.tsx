import { createClient } from '@/lib/supabase/server'
import { Category, AppLink, Settings } from '@/types'
import DashboardClient from './DashboardClient'
import Link from 'next/link'

export const revalidate = 0 

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: settingsData } = await supabase.from('settings').select('*').limit(1).single()
  const settings = settingsData as Settings | null

  const { data: categoriesData } = await supabase.from('categories').select('*').order('order_idx', { ascending: true })
  const categories = categoriesData as Category[] || []

  const { data: appsData } = await supabase.from('apps').select('*').order('order_idx', { ascending: true })
  const apps = appsData as AppLink[] || []

  const { data: { user } } = await supabase.auth.getUser()

  let isAdmin = false
  if (user) {
    if (user.email === 'john.limpiada@felice.ed.jp') {
        isAdmin = true
    } else {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        isAdmin = profile?.role === 'admin'
    }
  }

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
        <header className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Computer Class Dashboard</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 500, opacity: 0.9 }}>{user?.email}</span>
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
