import styles from './AppShell.module.css'

type AppShellProps = {
  backgroundUrl?: string | null
  children: React.ReactNode
  variant?: 'default' | 'wide' | 'login'
  centered?: boolean
}

export default function AppShell({
  backgroundUrl,
  children,
  variant = 'default',
  centered = false,
}: AppShellProps) {
  const bgStyle = {
    backgroundImage: backgroundUrl
      ? `url('${backgroundUrl}')`
      : 'var(--background-image)',
  }

  const innerClass =
    variant === 'wide'
      ? `${styles.inner} ${styles.innerWide}`
      : variant === 'login'
        ? `${styles.inner} ${styles.innerNarrow}`
        : styles.inner

  return (
    <div
      className={`${styles.shell} app-page${centered ? ` ${styles.centered}` : ''}`}
      style={bgStyle}
    >
      <div className={styles.overlay} aria-hidden="true" />
      <div className={innerClass}>{children}</div>
    </div>
  )
}
