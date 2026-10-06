'use client'

import { Category, AppLink } from '@/types'
import { useState, useEffect, useMemo, useRef } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, Globe } from 'lucide-react'
import Link from 'next/link'
import styles from './dashboard.module.css'

const STORAGE_KEY = 'ccd-category-expanded'

function loadExpanded(categories: Category[]): Record<string, boolean> {
  const defaults = categories.reduce(
    (acc, cat, i) => ({ ...acc, [cat.id]: i === 0 }),
    {} as Record<string, boolean>,
  )
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw) as Record<string, boolean>
    const merged = { ...defaults }
    for (const cat of categories) {
      if (typeof parsed[cat.id] === 'boolean') merged[cat.id] = parsed[cat.id]
    }
    return merged
  } catch {
    return defaults
  }
}

function AppIcon({ title, iconUrl }: { title: string; iconUrl: string }) {
  const [failed, setFailed] = useState(!iconUrl)
  const initial = title.trim().charAt(0).toUpperCase()

  if (failed) {
    return (
      <div className={styles.iconBox} aria-hidden="true">
        {initial ? (
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{initial}</span>
        ) : (
          <Globe size={24} />
        )}
      </div>
    )
  }

  return (
    <div className={styles.iconBox}>
      <img
        src={iconUrl}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function buildAppsByCategory(apps: AppLink[]): Map<string, AppLink[]> {
  const map = new Map<string, AppLink[]>()
  for (const app of apps) {
    const list = map.get(app.category_id)
    if (list) list.push(app)
    else map.set(app.category_id, [app])
  }
  return map
}

export default function DashboardClient({
  categories,
  apps,
  searchQuery = '',
  searchInputValue,
  isAdmin = false,
}: {
  categories: Category[]
  apps: AppLink[]
  searchQuery?: string
  /** Raw input for empty-state copy while debounce catches up */
  searchInputValue?: string
  isAdmin?: boolean
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    categories.reduce((acc, cat, i) => ({ ...acc, [cat.id]: i === 0 }), {}),
  )
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setExpanded(loadExpanded(categories))
    setHydrated(true)
  }, [categories])

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const expandedBeforeSearchRef = useRef<Record<string, boolean> | null>(null)
  const prevSearchRef = useRef('')

  useEffect(() => {
    if (!hydrated || normalizedQuery) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expanded))
    } catch {
      /* private browsing */
    }
  }, [expanded, hydrated, normalizedQuery])

  const appsByCategory = useMemo(() => buildAppsByCategory(apps), [apps])

  const filteredByCategory = useMemo(() => {
    const map = new Map<string, AppLink[]>()
    for (const cat of categories) {
      let categoryApps = appsByCategory.get(cat.id) ?? []
      if (normalizedQuery) {
        categoryApps = categoryApps.filter(
          (app) =>
            app.title.toLowerCase().includes(normalizedQuery) ||
            (app.description || '').toLowerCase().includes(normalizedQuery),
        )
      }
      map.set(cat.id, categoryApps)
    }
    return map
  }, [categories, appsByCategory, normalizedQuery])

  useEffect(() => {
    const prevQuery = prevSearchRef.current
    prevSearchRef.current = normalizedQuery

    if (!normalizedQuery && prevQuery) {
      if (expandedBeforeSearchRef.current) {
        setExpanded(expandedBeforeSearchRef.current)
        expandedBeforeSearchRef.current = null
      }
      return
    }

    if (!normalizedQuery) return

    const expandMatches = (base: Record<string, boolean>) => {
      const next = { ...base }
      for (const cat of categories) {
        if ((filteredByCategory.get(cat.id)?.length ?? 0) > 0) {
          next[cat.id] = true
        }
      }
      return next
    }

    if (!prevQuery) {
      setExpanded((current) => {
        expandedBeforeSearchRef.current = { ...current }
        return expandMatches(current)
      })
      return
    }

    setExpanded((current) => expandMatches(current))
  }, [normalizedQuery, categories, filteredByCategory])

  const toggleCategory = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const expandAll = () => {
    setExpanded(categories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {}))
  }

  const collapseAll = () => {
    setExpanded(categories.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {}))
  }

  const visibleCategories = normalizedQuery
    ? categories.filter((cat) => (filteredByCategory.get(cat.id)?.length ?? 0) > 0)
    : categories

  if (categories.length === 0) {
    return (
      <div className={`glass-panel ${styles.emptyPanel}`}>
        <p>No categories found yet.</p>
        <p className={styles.emptyHint}>
          {isAdmin ? (
            <>
              Add categories and apps in the{' '}
              <Link href="/admin" className="text-link">
                Admin Panel
              </Link>
              .
            </>
          ) : (
            'Ask your teacher to add class apps.'
          )}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <button type="button" className="btn-toolbar" onClick={expandAll}>
          Expand all
        </button>
        <button type="button" className="btn-toolbar" onClick={collapseAll}>
          Collapse all
        </button>
      </div>

      {normalizedQuery && visibleCategories.length === 0 && (
        <div className={`glass-panel ${styles.emptyPanel}`}>
          <p>No apps match &ldquo;{(searchInputValue ?? searchQuery).trim()}&rdquo;.</p>
        </div>
      )}

      {visibleCategories.map((category) => {
        const categoryApps = filteredByCategory.get(category.id) ?? []
        const isExpanded = expanded[category.id]
        const panelId = `category-panel-${category.id}`

        return (
          <div
            key={category.id}
            className={`${styles.categoryBlock}${isExpanded ? ` ${styles.categoryBlockExpanded}` : ''}`}
            style={{ background: category.color || 'var(--accent-color)' }}
          >
            <button
              type="button"
              className={`category-header ${styles.categoryHeaderInner}`}
              style={{
                background: 'transparent',
                margin: 0,
                borderRadius: 0,
                boxShadow: 'none',
              }}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => toggleCategory(category.id)}
            >
              {isExpanded ? (
                <ChevronDown style={{ marginRight: '0.5rem' }} aria-hidden="true" />
              ) : (
                <ChevronRight style={{ marginRight: '0.5rem' }} aria-hidden="true" />
              )}
              {category.title}
            </button>

            {isExpanded && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={`${panelId}-label`}
                className={`category-content ${styles.categoryContentInner}`}
              >
                <span id={`${panelId}-label`} className="sr-only">
                  {category.title}
                </span>
                {categoryApps.map((app) => (
                  <a
                    key={app.id}
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.appLink}
                    title={`${app.title} (opens in new tab)`}
                  >
                    <div className={`glass-card ${styles.appCard}`}>
                      <AppIcon title={app.title} iconUrl={app.icon_url} />
                      <div className={styles.appMeta}>
                        <div className={styles.appTitle}>
                          {app.title}
                          <ExternalLink size={14} className={styles.externalIcon} aria-hidden="true" />
                        </div>
                        <div className={styles.appDesc}>{app.description}</div>
                      </div>
                    </div>
                  </a>
                ))}
                {categoryApps.length === 0 && !normalizedQuery && (
                  <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', padding: '1rem' }}>
                    No apps in this category.
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
