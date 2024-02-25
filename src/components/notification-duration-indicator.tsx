import { CSSProperties, useEffect, useRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { classNames } from '../shared/utils'

interface Props {
  duration: number
  pause: boolean
}

const notificationDurationVariants = cva(
  'duration-timer absolute bottom-0 left-0 h-[6px]',
  {
    variants: {
      type: {
        default: 'bg-white',
        success: 'bg-success-3',
        info: 'bg-info-3',
        warning: 'bg-warning-3',
        error: 'bg-error-3',
        loading: 'bg-transparent',
      },
      defaultVariants: {
        type: 'default',
      },
    },
  },
)

interface Props extends VariantProps<typeof notificationDurationVariants> {
  duration: number
  pause: boolean
}

export const NotificationDurationIndicator = ({
  type,
  duration,
  pause,
}: Props) => {
  const toastDurationTimerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    pause ? handlePause() : handleResume()
  }, [pause])

  const handlePause = () => {
    toastDurationTimerRef.current!.style.animationPlayState = 'paused'
  }

  const handleResume = () => {
    toastDurationTimerRef.current!.style.animationPlayState = 'running'
    toastDurationTimerRef.current!.style.animation
  }

  const classes = classNames(notificationDurationVariants({ type }))

  return (
    <div
      ref={toastDurationTimerRef}
      className={classes}
      style={
        {
          '--duration': `${duration}s`,
        } as CSSProperties
      }
    />
  )
}
