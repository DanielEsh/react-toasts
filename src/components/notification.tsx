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
import type { NotificationHeightItem, ToastType } from '../types.ts'

interface Props {
  id: ToastType['id']
  index: number
  allNotificationsCount: number
  type: ToastType['type']
  duration: ToastType['duration']
  title: string
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
    index,
    allNotificationsCount,
    heights,
    onAddHeights,
    onChangeHeight,
    onRemoveHeights,
    onDismiss,
  } = props
  const notificationRef = useRef<HTMLLIElement>(null)

  const [mounted, setMounted] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true)
  }, [])

  const heightIndex = useMemo(
    () => props.heights.findIndex((height) => height.toastId === id) || 0,
    [heights, id],
  )

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
    // props.setHeights((h) => h.filter((height) => height.toastId !== props.id))

    // Добавим задержку перед вызовом onDelete() для завершения анимации
    setTimeout(() => {
      // dismiss
      onDismiss()
    }, TIME_BEFORE_UNMOUNT)
  }, [removed, offset])

  const handleRemove = () => {
    deleteToast()
  }

  const realDuration = props.duration * 1000

  // стартовое время
  const closeTimerStartTimeRef = React.useRef(0)

  // оставшиеся время
  const closeTimerRemainingTimeRef = React.useRef(realDuration)

  const closeTimerRef = React.useRef(0)

  const startTimer = (duration: number) => {
    window.clearTimeout(closeTimerRef.current)
    closeTimerStartTimeRef.current = new Date().getTime()
    closeTimerRef.current = window.setTimeout(handleRemove, duration)
  }

  const handleResume = () => {
    // стартануть timer с closeTimerRemainingTimeRef
    // onResume callback
    startTimer(closeTimerRemainingTimeRef.current)
  }

  const handlePause = () => {
    // получить elapsed time
    // сохранить ее в ref
    // clear timeout
    // onPause callback
    const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.current
    closeTimerRemainingTimeRef.current =
      closeTimerRemainingTimeRef.current - elapsedTime
    window.clearTimeout(closeTimerRef.current)
  }

  const handleHover = () => {
    console.log('hover')
    // if (toastDurationTimerRef.current) {
    //   toastDurationTimerRef.current.style.animationPlayState = 'paused'
    // }
    // cancelDelayedHide()
    handlePause()
  }

  const handleHoverLeave = () => {
    console.log('leave')
    // if (toastDurationTimerRef.current) {
    //   toastDurationTimerRef.current.style.animationPlayState = 'running'
    //   toastDurationTimerRef.current.style.animation
    // }
    // handleDelayedHide()
    if (props.duration) {
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
        onCloseClick={handleRemove}
      />
    </li>
  )
}
