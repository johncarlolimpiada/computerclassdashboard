'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import styles from './DashboardHeader.module.css'

const WordQuiz = dynamic(() => import('./WordQuiz'), {
  ssr: false,
  loading: () => (
    <span
      style={{
        fontSize: '0.82rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.5)',
        whiteSpace: 'nowrap',
      }}
    >
      Word Quiz…
    </span>
  ),
})

type DashboardHeaderProps = {
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
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function DashboardHeader({
  user,
  isAdmin,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) {
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    'User'
  const avatarSrc =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=random`

  return (
    <header className={`glass-panel ${styles.header}`}>
      <h1 className={styles.title}>Computer Class Dashboard</h1>
      <div className={styles.actions}>
        <div className={styles.searchWrap}>
          <label htmlFor="app-search" className="sr-only">
            Search apps
          </label>
          <input
            id="app-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search apps…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <WordQuiz />
        <div className="profile-chip">
          <img src={avatarSrc} alt={displayName} referrerPolicy="no-referrer" />
          <span className={styles.profileName}>{displayName}</span>
        </div>
        {isAdmin && (
          <Link href="/admin" className="btn-secondary">
            Admin Panel
          </Link>
        )}
        <form action="/auth/signout" method="POST">
          <button type="submit" className="btn-danger">
            Sign out
          </button>
        </form>
      </div>
    </header>
  )
}
