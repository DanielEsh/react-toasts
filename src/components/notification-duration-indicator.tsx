import {
  type CSSProperties,
  type ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { classNames } from '@/shared/utils'

const notificationDurationVariants = cva(
  'duration-timer absolute bottom-0 left-0 h-[6px]',
  {
    variants: {
      type: {
        default: 'bg-gray-100',
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
}

export interface NotificationDurationRef {
  pause: () => void
  resume: () => void
}

const NotificationDurationIndicatorImpl: ForwardRefRenderFunction<
  NotificationDurationRef,
  Props
> = ({ type, duration }, forwardedRef) => {
  const toastDurationTimerRef = useRef<HTMLDivElement>(null)

  const handlePause = () => {
    toastDurationTimerRef.current!.style.animationPlayState = 'paused'
  }

  const handleResume = () => {
    toastDurationTimerRef.current!.style.animationPlayState = 'running'
    toastDurationTimerRef.current!.style.animation
  }

  useImperativeHandle(forwardedRef, () => ({
    pause: handlePause,
    resume: handleResume,
  }))

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

export const NotificationDurationIndicator = forwardRef<
  NotificationDurationRef,
  Props
>(NotificationDurationIndicatorImpl)
