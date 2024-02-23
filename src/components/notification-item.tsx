import { Toast } from './toast.tsx'
import { NotificationDurationIndicator } from './notification-duration-indicator.tsx'
import { useEffect, useState } from 'react'
import { useTimer } from '../use-timer.ts'
import { useControllableState } from '../hooks/use-controllable-state.ts'
import { NotificationType } from '../types.ts'

interface Props {
  type: NotificationType['type']
  title: string
  description?: string
  duration?: number
  onDismiss: () => void
}

const TIME_BEFORE_UNMOUNT = 300

export const NotificationItem = (props: Props) => {
  const { type, title, description, duration, onDismiss } = props

  const [open = false, setOpen] = useControllableState({})

  useEffect(() => {
    setOpen(true)
  }, [])

  const deleteToast = () => {
    setTimeout(() => {
      onDismiss()
    }, TIME_BEFORE_UNMOUNT)
  }

  const handleRemove = () => {
    setOpen(false)
    deleteToast()
  }

  const realDuration = duration ? duration * 1000 : 0

  const { startTimer, pauseTimer, resumeTimer, clearTimer } = useTimer(
    realDuration,
    handleRemove,
  )

  const [isPause, setPause] = useState(false)

  useEffect(() => {
    if (duration) {
      startTimer()
    }
    return clearTimer
  }, [])

  const handleResume = () => {
    setPause(false)
    resumeTimer()
  }

  const handlePause = () => {
    setPause(true)
    pauseTimer()
  }

  const handleHover = () => {
    if (duration && !isPause) {
      handlePause()
    }
  }

  const handleHoverLeave = () => {
    if (duration) {
      handleResume()
    }
  }

  return (
    <div
      className={`notification-item`}
      data-state={open ? 'open' : 'closed'}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
    >
      <Toast
        type={type}
        title={title}
        description={description}
        onCloseClick={handleRemove}
      />
      {duration && (
        <NotificationDurationIndicator
          duration={duration}
          pause={isPause}
        />
      )}
    </div>
  )
}
