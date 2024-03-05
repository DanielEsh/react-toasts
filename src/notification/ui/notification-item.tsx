import { Toast } from '@/components/toast.tsx'
import {
  NotificationDurationIndicator,
  type NotificationDurationRef,
} from '@/components/notification-duration-indicator.tsx'
import { useEffect, useRef } from 'react'
import { useTimer } from '@/use-timer.ts'
import type { NotificationData } from '../types.ts'
import { SlideDown } from '../../components/framer/slide-down.tsx'
import { Icon } from '@/icon.tsx'

interface Props {
  type: NotificationData['type']
  title: string
  description?: string
  duration?: number
  onDismiss: () => void
}

export const NotificationItem = (props: Props) => {
  const durationIndicatorRef = useRef<NotificationDurationRef>(null)
  const { type, title, description, duration, onDismiss } = props

  const handleRemove = () => {
    onDismiss()
  }

  const realDuration = duration ? duration * 1000 : 0

  const { startTimer, pauseTimer, resumeTimer, clearTimer } = useTimer(
    realDuration,
    handleRemove,
  )

  useEffect(() => {
    console.log('USE EFFECT', duration)
    if (duration) {
      startTimer()
    }
    return clearTimer
  }, [duration])

  const handleResume = () => {
    if (!durationIndicatorRef.current) return
    durationIndicatorRef.current.resume()
    resumeTimer()
  }

  const handlePause = () => {
    if (!durationIndicatorRef.current) return
    durationIndicatorRef.current.pause()
    pauseTimer()
  }

  const handleHover = () => {
    if (duration) {
      handlePause()
    }
  }

  const handleHoverLeave = () => {
    if (duration) {
      handleResume()
    }
  }

  const renderIcon = () => {
    const tempMap = {
      success: <Icon name={'success'} />,
      info: <Icon name={'info'} />,
      warning: <Icon name={'warning'} />,
      error: <Icon name={'error'} />,
      default: null,
      loading: null,
    }

    return tempMap[type]
  }

  return (
    <SlideDown>
      <div
        className={`notification-item relative z-10 overflow-hidden rounded-lg`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
      >
        <Toast
          type={type}
          title={title}
          icon={renderIcon()}
          description={description}
          onCloseClick={handleRemove}
        />
        {duration && (
          <NotificationDurationIndicator
            ref={durationIndicatorRef}
            type={type}
            duration={duration}
          />
        )}
      </div>
    </SlideDown>
  )
}
