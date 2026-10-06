import { createClient } from '@/lib/supabase/server'
import { updateBackground, addCategory, addApp, deleteApp, deleteCategory, updateCategory, updateApp } from './actions'
import { Settings, Category, AppLink } from '@/types'
import Link from 'next/link'
import AdminClient from './AdminClient'
import AppShell from '../AppShell'
import BackgroundSettingsForm from './BackgroundSettingsForm'
import styles from './admin.module.css'

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

  if (!isAdmin) {
    return (
      <AppShell variant="wide">
        <div className="glass-panel" style={{ padding: '2rem', margin: '2rem' }}>
          Access Denied. Admins only.
        </div>
      </AppShell>
    )
  }

  const [{ data: settingsData }, { data: categoriesData }, { data: appsData }] = await Promise.all([
    supabase.from('settings').select('background_url').limit(1).single(),
    supabase
      .from('categories')
      .select('id, title, color, order_idx')
      .order('order_idx', { ascending: true }),
    supabase
      .from('apps')
      .select('id, category_id, title, description, url, icon_url, order_idx')
      .order('order_idx', { ascending: true }),
  ])

  const settings = settingsData as Settings | null

  return (
    <AppShell backgroundUrl={settings?.background_url} variant="wide">
      <header className="header-bar glass-panel">
        <h1>Admin Dashboard</h1>
        <Link href="/" className="btn-secondary">
          Back to Home
        </Link>
      </header>

      <nav className={styles.subnav} aria-label="Admin sections">
        <a href="#settings" className={styles.subnavLink}>
          Settings
        </a>
        <a href="#categories" className={styles.subnavLink}>
          Categories
        </a>
        <a href="#apps" className={styles.subnavLink}>
          Apps
        </a>
      </nav>

      <div id="settings" className={`glass-panel ${styles.section}`} style={{ padding: '2rem' }}>
        <h2>Dashboard Settings</h2>
        <BackgroundSettingsForm
          action={updateBackground}
          defaultUrl={settings?.background_url || ''}
        />
      </div>

      <AdminClient
        categories={(categoriesData as Category[]) || []}
        apps={(appsData as AppLink[]) || []}
        addCategoryAction={addCategory}
        addAppAction={addApp}
        deleteCategoryAction={deleteCategory}
        deleteAppAction={deleteApp}
        updateCategoryAction={updateCategory}
        updateAppAction={updateApp}
      />
    </AppShell>
  )
}
