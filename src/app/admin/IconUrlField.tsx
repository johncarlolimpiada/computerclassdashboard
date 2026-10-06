'use client'

import { useState } from 'react'
import styles from './admin.module.css'

export default function IconUrlField({
  name,
  defaultValue,
  placeholder,
  required,
}: {
  name: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}) {
  const [url, setUrl] = useState(defaultValue || '')

  return (
    <div className={styles.iconPreviewRow}>
      <div style={{ flex: 1 }}>
        <label className="form-label" htmlFor={name}>
          Icon Image URL
        </label>
        <input
          id={name}
          name={name}
          type="url"
          className="input-field"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {url ? (
        <img src={url} alt="" className={styles.iconPreview} onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
      ) : null}
    </div>
  )
}
