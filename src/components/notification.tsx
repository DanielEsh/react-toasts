import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useCallback,
  CSSProperties,
} from 'react'
import { Toast } from './toast.tsx'
import type { NotificationHeightItem } from '../types.ts'
import { useTimer } from '../use-timer.ts'
import { NotificationType } from '../types.ts'

interface Props {
  id: NotificationType['id']
  index: number
  allNotificationsCount: number
  type: NotificationType['type']
  duration: NotificationType['duration']
  title: string
  description?: string
  heights: NotificationHeightItem[]
  onChangeHeight: (newHeight: number) => void
  onRemoveHeights: () => void
  onAddHeights: (height: number) => void
  onDismiss: () => void
}

const NOTIFICATIONS_GAP = 16
const TIME_BEFORE_UNMOUNT = 300

export const Notification = (props: Props) => {
  const {
    id,
    type,
    title,
    description,
    duration,
    index,
    allNotificationsCount,
    heights,
    onAddHeights,
    onChangeHeight,
    onRemoveHeights,
    onDismiss,
  } = props
  const notificationRef = useRef<HTMLLIElement>(null)
  const toastDurationTimerRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heightIndex = index

  const notificationHeightBefore = useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev
      }

      return prev + curr.height
    }, 0)
  }, [heights, heightIndex])

  const offset = React.useRef(0)
  offset.current = React.useMemo(
    () => heightIndex * NOTIFICATIONS_GAP + notificationHeightBefore,
    [heightIndex, notificationHeightBefore],
  )

  useLayoutEffect(() => {
    const toastNode = notificationRef.current
    if (!mounted || !toastNode) return

    const originalHeight = toastNode.style.height
    toastNode.style.height = 'auto'
    const newHeight = toastNode.getBoundingClientRect().height
    toastNode.style.height = originalHeight

    onChangeHeight(newHeight)
  }, [mounted, id])

  useEffect(() => {
    const toastNode = notificationRef.current
    if (!toastNode) return

    const height = toastNode.getBoundingClientRect().height

    onAddHeights(height)

    return () => onRemoveHeights()
  }, [props.id])

  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true)

    setTimeout(() => {
      onDismiss()
    }, TIME_BEFORE_UNMOUNT)
  }, [removed, offset])

  const handleRemove = () => {
    deleteToast()
  }

  const realDuration = duration ? duration * 1000 : 0

  const { startTimer, pauseTimer, resumeTimer, clearTimer } = useTimer(
    realDuration,
    handleRemove,
  )

  useEffect(() => {
    if (duration) {
      startTimer()
    }
    return clearTimer
  }, [])

  const handleResume = () => {
    resumeTimer()
  }

  const handlePause = () => {
    pauseTimer()
  }

  const handleHover = () => {
    if (toastDurationTimerRef.current) {
      toastDurationTimerRef.current.style.animationPlayState = 'paused'
    }
    handlePause()
  }

  const handleHoverLeave = () => {
    if (toastDurationTimerRef.current) {
      toastDurationTimerRef.current.style.animationPlayState = 'running'
      toastDurationTimerRef.current.style.animation
    }

    if (duration) {
      handleResume()
    }
  }

  return (
    <li
      ref={notificationRef}
      className={`toast _${type}`}
      data-mounted={mounted}
      data-removed={removed}
      style={
        {
          '--index': index,
          '--toasts-before': index,
          '--z-index': allNotificationsCount - index,
          '--offset': `${offset.current}px`,
          '--initial-height': 'auto',
        } as CSSProperties
      }
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
    >
      <Toast
        title={title}
        description={description}
        onCloseClick={handleRemove}
      />
      {duration && (
        <div
          ref={toastDurationTimerRef}
          className="durationTimer"
          style={
            {
              '--duration': `${props.duration}s`,
            } as CSSProperties
          }
        />
      )}
    </li>
  )
}
