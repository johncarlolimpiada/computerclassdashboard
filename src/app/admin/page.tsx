import { createClient } from '@/lib/supabase/server'
import { updateBackground, addCategory, addApp, deleteApp, deleteCategory, updateCategory, updateApp } from './actions'
import { Settings, Category, AppLink } from '@/types'
import Link from 'next/link'
import AdminClient from './AdminClient'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Access Denied</div>

  let isAdmin = false
  if (user.email === 'john.limpiada@felice.ed.jp') {
    isAdmin = true
  } else {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role === 'admin') isAdmin = true
  }

  if (!isAdmin) return <div className="glass-panel" style={{ padding: '2rem', margin: '2rem' }}>Access Denied. Admins only.</div>

  const { data: settingsData } = await supabase.from('settings').select('*').limit(1).single()
  const { data: categoriesData } = await supabase.from('categories').select('*').order('order_idx', { ascending: true })
  const { data: appsData } = await supabase.from('apps').select('*').order('order_idx', { ascending: true })

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
         <h1 style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Admin Dashboard</h1>
         <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>Back to Home</Link>
      </header>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2>Dashboard Settings</h2>
        <form action={updateBackground} style={{ marginTop: '1rem' }}>
          <label className="form-label">Background Image URL</label>
          <input name="backgroundUrl" type="url" className="input-field" defaultValue={settingsData?.background_url || ''} required />
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Save Background</button>
        </form>
      </div>

      <AdminClient 
         categories={categoriesData as Category[]} 
         apps={appsData as AppLink[]} 
         addCategoryAction={addCategory} 
         addAppAction={addApp}
         deleteCategoryAction={deleteCategory}
         deleteAppAction={deleteApp}
         updateCategoryAction={updateCategory}
         updateAppAction={updateApp}
      />
    </div>
  )
}
