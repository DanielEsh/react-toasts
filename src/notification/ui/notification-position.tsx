import {
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  type CSSProperties,
  type ReactNode,
  useState,
} from 'react'
import type { NotificationHeightItem } from '../types.ts'
import type { NotificationData } from '../types.ts'

interface Props {
  id: NotificationData['id']
  index: number
  allNotificationsCount: number
  children: ReactNode
  x: string
  y: string
  notificationHeightBefore: number
  onChangeHeight: (newHeight: number) => void
  onRemoveHeights: () => void
  onAddHeights: (height: number) => void
}

const NOTIFICATIONS_GAP = 16

export const NotificationPosition = (props: Props) => {
  const {
    id,
    index,
    allNotificationsCount,
    children,
    notificationHeightBefore,
    x,
    y,
    onAddHeights,
    onChangeHeight,
    onRemoveHeights,
  } = props
  const notificationRef = useRef<HTMLLIElement>(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heightIndex = index

  const offset = useRef(0)
  offset.current = useMemo(
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
  }, [id])

  return (
    <li
      ref={notificationRef}
      className={`notification-position`}
      data-position-y={y}
      data-position-x={x}
      style={
        {
          '--index': index,
          '--toasts-before': index,
          '--z-index': allNotificationsCount - index,
          '--offset': `${offset.current}px`,
        } as CSSProperties
      }
    >
      {children}
    </li>
  )
}
