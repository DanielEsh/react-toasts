import {
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  CSSProperties,
} from 'react'
import type { NotificationHeightItem } from '../types.ts'
import { NotificationType } from '../types.ts'
import { NotificationItem } from './notification-item.tsx'

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

  const offset = useRef(0)
  offset.current = useMemo(
    () => heightIndex * NOTIFICATIONS_GAP + notificationHeightBefore,
    [heightIndex, notificationHeightBefore],
  )

  useLayoutEffect(() => {
    const toastNode = notificationRef.current
    if (!toastNode) return

    const originalHeight = toastNode.style.height
    toastNode.style.height = 'auto'
    const newHeight = toastNode.getBoundingClientRect().height
    toastNode.style.height = originalHeight

    onChangeHeight(newHeight)
  }, [id])

  useEffect(() => {
    const toastNode = notificationRef.current
    if (!toastNode) return

    const height = toastNode.getBoundingClientRect().height

    onAddHeights(height)

    return () => onRemoveHeights()
  }, [id])

  return (
    <li
      ref={notificationRef}
      className={`notification-position`}
      style={
        {
          '--index': index,
          '--toasts-before': index,
          '--z-index': allNotificationsCount - index,
          '--offset': `${offset.current}px`,
        } as CSSProperties
      }
    >
      <NotificationItem
        type={type}
        title={title}
        description={description}
        duration={duration}
        onDismiss={onDismiss}
      />
    </li>
  )
}
