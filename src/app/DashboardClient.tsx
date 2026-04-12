'use client'

import { Category, AppLink } from '@/types'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Lock } from 'lucide-react'

export default function DashboardClient({ categories, apps }: { categories: Category[], apps: AppLink[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {})
  )

  const toggleCategory = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      {categories.map((category) => {
        const categoryApps = apps.filter(app => app.category_id === category.id)
        const isExpanded = expanded[category.id]

        return (
          <div key={category.id} style={{ marginBottom: '1.5rem', background: category.color || 'var(--accent-color)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.3)', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
             <div 
               className="category-header" 
               style={{ background: 'transparent', margin: 0, borderRadius: 0, boxShadow: 'none', borderBottom: isExpanded ? '1px solid rgba(0,0,0,0.2)' : 'none' }}
               onClick={() => toggleCategory(category.id)}
             >
                {isExpanded ? <ChevronDown style={{ marginRight: '0.5rem' }} /> : <ChevronRight style={{ marginRight: '0.5rem' }}/>}
                {category.title}
             </div>

             {isExpanded && (
               <div className="category-content" style={{ padding: '1rem', margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                 {categoryApps.map(app => (
                   <a 
                     key={app.id} 
                     href={app.url} 
                     target="_blank" 
                     rel="noreferrer"
                     style={{ textDecoration: 'none', color: 'inherit' }}
                   >
                     <div className="glass-card" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', backgroundColor: 'rgba(30, 30, 30, 0.95)', border: '1px solid rgba(0,0,0,0.8)' }}>
                        <div style={{ flexShrink: 0, width: '48px', height: '48px', background: 'white', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <img src={app.icon_url} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {app.title}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {app.description}
                          </div>
                        </div>
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} title="Online / Active"></div>
                     </div>
                   </a>
                 ))}
                 {categoryApps.length === 0 && (
                   <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', padding: '1rem' }}>No apps in this category.</div>
                 )}
               </div>
             )}
          </div>
        )
      })}
      {categories.length === 0 && (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          No categories found. Admins can add them in the admin dashboard.
        </div>
      )}
    </div>
  )
}
