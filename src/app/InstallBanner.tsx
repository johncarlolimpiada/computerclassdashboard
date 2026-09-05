'use client'

import { useEffect, useState } from 'react'
import { Download, Monitor, X } from 'lucide-react'
import styles from './InstallBanner.module.css'

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'computer-class-install-dismissed'
const WEEK = 7 * 24 * 60 * 60 * 1000

export default function InstallBanner() {
  const [platform, setPlatform] = useState<'apple' | 'android' | null>(null)
  const [hidden, setHidden] = useState(true)
  const [instructions, setInstructions] = useState(false)
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)')
    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean }
    const apple = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const android = /Android/i.test(navigator.userAgent)

    function refresh() {
      let dismissed = false
      try {
        const timestamp = Number(localStorage.getItem(DISMISS_KEY))
        dismissed = timestamp > 0 && Date.now() - timestamp < WEEK
      } catch { /* Storage may be unavailable in private browsing. */ }
      setPlatform(apple ? 'apple' : android ? 'android' : null)
      setHidden(dismissed || standalone.matches || navigatorWithStandalone.standalone === true)
    }

    function capturePrompt(event: Event) {
      if (!apple && !android) return
      event.preventDefault()
      setPrompt(event as InstallPromptEvent)
    }

    function installed() {
      setHidden(true)
      setPrompt(null)
    }

    // Defer initial browser-only state until after hydration.
    const timer = window.setTimeout(refresh, 0)
    window.addEventListener('beforeinstallprompt', capturePrompt)
    window.addEventListener('appinstalled', installed)
    window.addEventListener('storage', refresh)
    standalone.addEventListener('change', refresh)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', capturePrompt)
      window.removeEventListener('appinstalled', installed)
      window.removeEventListener('storage', refresh)
      standalone.removeEventListener('change', refresh)
    }
  }, [])

  function dismiss() {
    setHidden(true)
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())) } catch { /* Still dismiss this visit. */ }
  }

  async function install() {
    if (!prompt) return
    setInstalling(true)
    try {
      await prompt.prompt()
      const choice = await prompt.userChoice
      if (choice.outcome === 'accepted') setHidden(true)
    } catch {
      setInstructions(true)
    } finally {
      setPrompt(null)
      setInstalling(false)
    }
  }

  if (hidden || !platform) return null

  return (
    <aside className={styles.banner} aria-label="Install Computer Class">
      <div className={styles.row}>
        <Monitor className={styles.icon} size={28} aria-hidden="true" />
        <div className={styles.copy}>
          <p className={styles.title}>Add Computer Class to your Home Screen</p>
          <p className={styles.subtitle}>Open your class apps with a tap.</p>
        </div>
        {platform === 'android' && prompt ? (
          <button type="button" className={styles.action} onClick={install} disabled={installing}>
            <Download size={18} aria-hidden="true" />{installing ? 'Installing…' : 'Install'}
          </button>
        ) : (
          <button type="button" className={styles.action} aria-expanded={instructions} aria-controls="install-instructions" onClick={() => setInstructions(!instructions)}>
            How to install
          </button>
        )}
        <button type="button" className={styles.dismiss} onClick={dismiss} aria-label="Dismiss installation banner for seven days">
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      {instructions && (
        <div id="install-instructions" className={styles.instructions}>
          {platform === 'apple' ? (
            <>
              <ol>
                <li>Tap the browser’s <strong>Share</strong> button (it may be inside the menu).</li>
                <li>Choose <strong>Add to Home Screen</strong>.</li>
                <li>Keep <strong>Open as Web App</strong> on if shown, then tap <strong>Add</strong>.</li>
              </ol>
              <p>If the option is missing, open this page in Safari and try again.</p>
            </>
          ) : (
            <p>Open your browser’s menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>, if available. If you don’t see either option, try opening this page in Chrome.</p>
          )}
        </div>
      )}
    </aside>
  )
}
