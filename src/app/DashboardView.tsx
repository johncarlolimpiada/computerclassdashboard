'use client'

import { useState, useEffect } from 'react'
import { Category, AppLink } from '@/types'
import DashboardHeader from './DashboardHeader'
import DashboardClient from './DashboardClient'
import InstallBanner from './InstallBanner'

const SEARCH_DEBOUNCE_MS = 200

type DashboardViewProps = {
  categories: Category[]
  apps: AppLink[]
  user: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      picture?: string
      full_name?: string
      name?: string
    }
  }
  isAdmin: boolean
}

export default function DashboardView({
  categories,
  apps,
  user,
  isAdmin,
}: DashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [searchQuery])

  return (
    <>
      <InstallBanner />
      <DashboardHeader
        user={user}
        isAdmin={isAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <DashboardClient
        categories={categories}
        apps={apps}
        searchQuery={debouncedSearchQuery}
        searchInputValue={searchQuery}
        isAdmin={isAdmin}
      />
    </>
  )
}
