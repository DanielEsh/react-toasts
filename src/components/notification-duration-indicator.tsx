import { CSSProperties, useEffect, useRef } from 'react'

interface Props {
  duration: number
  pause: boolean
}

export const NotificationDurationIndicator = ({ duration, pause }: Props) => {
  const toastDurationTimerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('EFFECT', pause)
    pause ? handlePause() : handleResume()
  }, [pause])

  const handlePause = () => {
    console.log('pause')
    toastDurationTimerRef.current!.style.animationPlayState = 'paused'
  }

  const handleResume = () => {
    console.log('resume')
    toastDurationTimerRef.current!.style.animationPlayState = 'running'
    toastDurationTimerRef.current!.style.animation
  }

  return (
    <div
      ref={toastDurationTimerRef}
      className="durationTimer"
      style={
        {
          '--duration': `${duration}s`,
        } as CSSProperties
      }
    />
  )
}
