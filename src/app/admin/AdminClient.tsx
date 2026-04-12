'use client'

import { Category, AppLink } from '@/types'
import { useState } from 'react'
import { Trash2, Edit2, X } from 'lucide-react'

export default function AdminClient({ 
  categories, apps, addCategoryAction, addAppAction, deleteCategoryAction, deleteAppAction, updateCategoryAction, updateAppAction
}: { 
  categories: Category[], apps: AppLink[],
  addCategoryAction: (formData: FormData) => Promise<void>,
  addAppAction: (formData: FormData) => Promise<void>,
  deleteCategoryAction: (formData: FormData) => Promise<void>,
  deleteAppAction: (formData: FormData) => Promise<void>,
  updateCategoryAction: (formData: FormData) => Promise<void>,
  updateAppAction: (formData: FormData) => Promise<void>
}) {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingAppId, setEditingAppId] = useState<string | null>(null)

  return (
    <>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Categories</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
              {editingCategoryId === cat.id ? (
                <form action={(formData) => { updateCategoryAction(formData); setEditingCategoryId(null) }} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) minmax(100px, 1fr) minmax(80px, 1fr) auto', gap: '1rem', alignItems: 'end' }}>
                   <input type="hidden" name="id" value={cat.id} />
                   <div><label className="form-label">Title</label><input name="title" type="text" className="input-field" defaultValue={cat.title} required /></div>
                   <div><label className="form-label">Color Picker</label><input name="color" type="color" className="input-field" style={{ padding: '0.25rem', height: '42px', cursor: 'pointer' }} defaultValue={cat.color.startsWith('#') ? cat.color.slice(0, 7) : '#6366f1'} required /></div>
                   <div><label className="form-label">Order Index</label><input name="order_idx" type="number" className="input-field" defaultValue={cat.order_idx} required /></div>
                   <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2px' }}>
                     <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Save</button>
                     <button type="button" onClick={() => setEditingCategoryId(null)} className="btn-primary" style={{ padding: '0.5rem', background: '#555' }}><X size={20} /></button>
                   </div>
                </form>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{cat.title}</strong>; - <span style={{ color: cat.color }}>{cat.color}</span> (Order: {cat.order_idx})
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setEditingCategoryId(cat.id)} style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer' }}>
                      <Edit2 size={20} />
                    </button>
                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="id" value={cat.id} />
                      <button type="submit" style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={20} /></button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ))}
          {categories.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No categories found.</p>}
        </div>

        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', marginTop: '2rem' }}>Add New Category</h3>
        <form action={addCategoryAction} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) auto', gap: '1rem', alignItems: 'end' }}>
           <div>
             <label className="form-label">Title</label>
             <input name="title" type="text" className="input-field" placeholder="E.g., A. General" required />
           </div>
           <div>
             <label className="form-label">Color Picker</label>
             <input name="color" type="color" className="input-field" style={{ padding: '0.25rem', height: '42px', cursor: 'pointer' }} defaultValue="#6366f1" required />
           </div>
           <div>
             <label className="form-label">Order Index</label>
             <input name="order_idx" type="number" className="input-field" defaultValue={0} required />
           </div>
           <button type="submit" className="btn-primary" style={{ marginBottom: '2px' }}>Add</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Web Apps</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          {apps.map(app => {
            const cat = categories.find(c => c.id === app.category_id)
            return (
              <div key={app.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                {editingAppId === app.id ? (
                  <form action={(formData) => { updateAppAction(formData); setEditingAppId(null) }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="hidden" name="id" value={app.id} />
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}><label className="form-label">Category</label><select name="category_id" className="input-field" defaultValue={app.category_id} required>{categories.map(c => <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.title}</option>)}</select></div>
                      <div style={{ flex: 1 }}><label className="form-label">Order Index</label><input name="order_idx" type="number" className="input-field" defaultValue={app.order_idx} required /></div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}><label className="form-label">Title</label><input name="title" type="text" className="input-field" defaultValue={app.title} required /></div>
                      <div style={{ flex: 1 }}><label className="form-label">URL</label><input name="url" type="url" className="input-field" defaultValue={app.url} required /></div>
                    </div>
                    <div><label className="form-label">Description / Subtitle</label><input name="description" type="text" className="input-field" defaultValue={app.description} /></div>
                    <div><label className="form-label">Icon Image URL</label><input name="icon_url" type="url" className="input-field" defaultValue={app.icon_url} required /></div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <button type="submit" className="btn-primary">Save Changes</button>
                      <button type="button" onClick={() => setEditingAppId(null)} className="btn-primary" style={{ background: '#555' }}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{app.title}</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>({cat?.title || 'Unknown Category'})</span>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{app.url}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="button" onClick={() => setEditingAppId(app.id)} style={{ background: 'transparent', border: 'none', color: '#6366f1', cursor: 'pointer' }}>
                        <Edit2 size={20} />
                      </button>
                      <form action={deleteAppAction}>
                        <input type="hidden" name="id" value={app.id} />
                        <button type="submit" style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={20} /></button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {apps.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No apps found.</p>}
        </div>

        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', marginTop: '2rem' }}>Add New Web App</h3>
        <form action={addAppAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ flex: 1 }}><label className="form-label">Category</label><select name="category_id" className="input-field" required>{categories.map(c => <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.title}</option>)}</select></div>
             <div style={{ flex: 1 }}><label className="form-label">Order Index</label><input name="order_idx" type="number" className="input-field" defaultValue={0} required /></div>
           </div>
           <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ flex: 1 }}><label className="form-label">Title</label><input name="title" type="text" className="input-field" placeholder="Computer Class Lessons" required /></div>
             <div style={{ flex: 1 }}><label className="form-label">URL</label><input name="url" type="url" className="input-field" placeholder="https://example.com" required /></div>
           </div>
           <div><label className="form-label">Description / Subtitle</label><input name="description" type="text" className="input-field" placeholder="Activities and Student Work" /></div>
           <div><label className="form-label">Icon Image URL</label><input name="icon_url" type="url" className="input-field" placeholder="https://example.com/icon.png" required /></div>
           <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Add App</button>
        </form>
      </div>
    </>
  )
}
