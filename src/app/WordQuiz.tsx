'use client'

import { useState, useEffect } from 'react'
import { getDailyQuestions, type QuizQuestion } from '@/data/quiz-questions'

type Phase = 'idle' | 'quiz' | 'done'

const STORAGE_DATE = 'wq-date'
const STORAGE_SCORE = 'wq-score'

function todayKey(): string {
  return new Date().toISOString().split('T')[0]
}

const scoreMessage = (score: number) => {
  if (score === 3) return 'Perfect score! See you tomorrow. 🌟'
  if (score === 2) return 'Great job! Keep it up. 👍'
  if (score === 1) return 'Good effort! Practice makes perfect. 📚'
  return "Don't give up! You'll do better tomorrow. 💪"
}

const scoreEmoji = (score: number) => {
  if (score === 3) return '🌟'
  if (score === 2) return '👍'
  if (score === 1) return '📚'
  return '💪'
}

export default function WordQuiz() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [collectedAnswers, setCollectedAnswers] = useState<number[]>([])
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [questions] = useState<QuizQuestion[]>(() => getDailyQuestions(3))

  useEffect(() => {
    if (localStorage.getItem(STORAGE_DATE) === todayKey()) {
      setFinalScore(Number(localStorage.getItem(STORAGE_SCORE)))
    }
  }, [])

  const openQuiz = () => {
    if (finalScore !== null) {
      setPhase('done')
      return
    }
    setStep(0)
    setPicked(null)
    setCollectedAnswers([])
    setPhase('quiz')
  }

  const pick = (idx: number) => {
    if (picked !== null) return
    setPicked(idx)
  }

  const advance = () => {
    if (picked === null) return
    const newAnswers = [...collectedAnswers, picked]

    if (step < 2) {
      setStep(s => s + 1)
      setPicked(null)
      setCollectedAnswers(newAnswers)
    } else {
      const score = newAnswers.filter((a, i) => a === questions[i].answer).length
      localStorage.setItem(STORAGE_DATE, todayKey())
      localStorage.setItem(STORAGE_SCORE, String(score))
      setFinalScore(score)
      setCollectedAnswers(newAnswers)
      setPhase('done')
    }
  }

  const q = questions[step]
  const done = finalScore !== null

  return (
    <>
      {/* ── Header trigger button ── */}
      <button
        onClick={openQuiz}
        style={{
          background: done ? 'rgba(34, 197, 94, 0.2)' : 'rgba(99, 102, 241, 0.2)',
          border: `1px solid ${done ? 'rgba(34, 197, 94, 0.45)' : 'rgba(99, 102, 241, 0.45)'}`,
          borderRadius: '50px',
          padding: '0.3rem 0.9rem',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          transition: 'background 0.2s',
        }}
      >
        {done ? `${scoreEmoji(finalScore!)} ${finalScore}/3` : '📝 Word Quiz'}
      </button>

      {/* ── Overlay ── */}
      {phase !== 'idle' && (
        <div
          onClick={() => setPhase('idle')}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <div
            className="glass-panel"
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '440px', padding: '1.5rem' }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>
                {phase === 'quiz' ? `Question ${step + 1} of 3` : "Today's Results"}
              </span>
              <button
                onClick={() => setPhase('idle')}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: '0.25rem' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* ── Quiz phase ── */}
            {phase === 'quiz' && (
              <>
                {/* Progress bar */}
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px', marginBottom: '1.25rem', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(step / 3) * 100}%`,
                      background: 'var(--accent-color)',
                      borderRadius: '2px',
                      transition: 'width 0.35s ease',
                    }}
                  />
                </div>

                <p style={{ marginBottom: '1.25rem', fontSize: '1rem', lineHeight: 1.55, fontWeight: 600 }}>
                  {q.question}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {q.choices.map((choice, idx) => {
                    const isCorrect = idx === q.answer
                    const isPicked = idx === picked
                    const revealed = picked !== null

                    let bg = 'rgba(255,255,255,0.06)'
                    let border = '1px solid rgba(255,255,255,0.13)'
                    let textColor = 'white'

                    if (revealed) {
                      if (isCorrect) {
                        bg = 'rgba(34, 197, 94, 0.22)'
                        border = '1px solid rgba(34, 197, 94, 0.6)'
                      } else if (isPicked) {
                        bg = 'rgba(239, 68, 68, 0.22)'
                        border = '1px solid rgba(239, 68, 68, 0.6)'
                      } else {
                        textColor = 'rgba(255,255,255,0.35)'
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => pick(idx)}
                        disabled={revealed}
                        style={{
                          background: bg,
                          border,
                          borderRadius: '8px',
                          padding: '0.65rem 1rem',
                          color: textColor,
                          cursor: revealed ? 'default' : 'pointer',
                          textAlign: 'left',
                          fontSize: '0.88rem',
                          lineHeight: 1.4,
                          fontFamily: 'inherit',
                          transition: 'background 0.2s, border 0.2s, color 0.2s',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ opacity: 0.5, flexShrink: 0, minWidth: '1rem' }}>
                          {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        {choice}
                      </button>
                    )
                  })}
                </div>

                {picked !== null && (
                  <button
                    onClick={advance}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    {step < 2 ? 'Next question →' : 'End quiz'}
                  </button>
                )}
              </>
            )}

            {/* ── Results phase ── */}
            {phase === 'done' && finalScore !== null && (
              <div style={{ textAlign: 'center', padding: '0.75rem 0 0.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>{scoreEmoji(finalScore)}</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.5px' }}>
                  {finalScore} / 3
                </div>
                <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {scoreMessage(finalScore)}
                </p>
                <button
                  onClick={() => setPhase('idle')}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
