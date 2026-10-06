'use client'

import { useState } from 'react'
import styles from './admin.module.css'

export default function BackgroundSettingsForm({
  action,
  defaultUrl,
}: {
  action: (formData: FormData) => Promise<void>
  defaultUrl: string
}) {
  const [previewUrl, setPreviewUrl] = useState(defaultUrl)

  return (
    <form action={action}>
      <label className="form-label" htmlFor="backgroundUrl">
        Background Image URL
      </label>
      <input
        id="backgroundUrl"
        name="backgroundUrl"
        type="url"
        className="input-field"
        value={previewUrl}
        onChange={(e) => setPreviewUrl(e.target.value)}
        required
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Background preview" className={styles.previewThumb} />
      ) : null}
      <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
        Save Background
      </button>
    </form>
  )
}
