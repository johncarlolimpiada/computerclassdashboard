import { createClient } from '@/lib/supabase/server'
import { Category, AppLink, Settings } from '@/types'
import DashboardView from './DashboardView'
import AppShell from './AppShell'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const userPromise = supabase.auth.getUser()
  const settingsPromise = supabase.from('settings').select('background_url').limit(1).single()
  const categoriesPromise = supabase
    .from('categories')
    .select('id, title, color, order_idx')
    .order('order_idx', { ascending: true })
  const appsPromise = supabase
    .from('apps')
    .select('id, category_id, title, description, url, icon_url, order_idx')
    .order('order_idx', { ascending: true })

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
  const categories = (categoriesData as Category[]) || []
  const apps = (appsData as AppLink[]) || []

  if (!user) redirect('/login')

  const isAdmin =
    user.email === 'john.limpiada@felice.ed.jp' || profileResult?.data?.role === 'admin'

  return (
    <AppShell backgroundUrl={settings?.background_url}>
      <DashboardView categories={categories} apps={apps} user={user} isAdmin={isAdmin} />
    </AppShell>
  )
}
