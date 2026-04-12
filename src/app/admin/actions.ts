'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBackground(formData: FormData) {
  const url = formData.get('backgroundUrl') as string
  const supabase = await createClient()
  await supabase.from('settings').update({ background_url: url }).eq('id', 1)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function addCategory(formData: FormData) {
  const title = formData.get('title') as string
  const color = formData.get('color') as string
  const order_idx = parseInt(formData.get('order_idx') as string) || 0
  const supabase = await createClient()
  await supabase.from('categories').insert([{ title, color, order_idx }])
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function addApp(formData: FormData) {
  const category_id = formData.get('category_id') as string
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const icon_url = formData.get('icon_url') as string
  const description = formData.get('description') as string
  const order_idx = parseInt(formData.get('order_idx') as string) || 0

  const supabase = await createClient()
  await supabase.from('apps').insert([{ category_id, title, url, icon_url, description, order_idx }])
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = await createClient()
  await supabase.from('categories').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteApp(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = await createClient()
  await supabase.from('apps').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateCategory(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const color = formData.get('color') as string
  const order_idx = parseInt(formData.get('order_idx') as string) || 0
  const supabase = await createClient()
  await supabase.from('categories').update({ title, color, order_idx }).eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateApp(formData: FormData) {
  const id = formData.get('id') as string
  const category_id = formData.get('category_id') as string
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const icon_url = formData.get('icon_url') as string
  const description = formData.get('description') as string
  const order_idx = parseInt(formData.get('order_idx') as string) || 0

  const supabase = await createClient()
  await supabase.from('apps').update({ category_id, title, url, icon_url, description, order_idx }).eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin')
}
