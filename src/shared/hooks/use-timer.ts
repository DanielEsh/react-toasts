import { useCallback, useRef } from 'react'

export function useTimer(duration: number, timeoutCallback: () => void) {
  const closeTimerStartTimeRef = useRef(0)
  const closeTimerRemainingTimeRef = useRef(duration)

  const closeTimerRef = useRef(0)

  const startTimer = useCallback(() => {
    window.clearTimeout(closeTimerRef.current)
    closeTimerStartTimeRef.current = new Date().getTime()
    closeTimerRef.current = window.setTimeout(timeoutCallback, duration)
  }, [])

  const resumeTimer = useCallback(() => {
    window.clearTimeout(closeTimerRef.current)
    closeTimerStartTimeRef.current = new Date().getTime()
    closeTimerRef.current = window.setTimeout(
      timeoutCallback,
      closeTimerRemainingTimeRef.current,
    )
  }, [timeoutCallback])

  const pauseTimer = useCallback(() => {
    const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current
    closeTimerRemainingTimeRef.current =
      closeTimerRemainingTimeRef.current - elapsedTime
    window.clearTimeout(closeTimerRef.current)
  }, [])

  const clearTimer = useCallback(() => {
    clearTimeout(closeTimerStartTimeRef.current)
  }, [])

  return {
    startTimer,
    pauseTimer,
    resumeTimer,
    clearTimer,
  }
}
