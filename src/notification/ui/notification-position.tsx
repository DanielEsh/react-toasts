import {
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  type CSSProperties,
  type ReactNode,
  memo,
} from 'react'
import type { NotificationData } from '../types.ts'
import { useIsMounted } from '@/hooks/use-is-mounted.ts'

interface Props {
  id?: NotificationData['id']
  index: number
  children: ReactNode
  x: string
  y: string
  notificationHeightBefore: number
  onChangeHeight: (id: NotificationData['id'], newHeight: number) => void
  onRemoveHeights: (id: NotificationData['id']) => void
  onAddHeights: (id: NotificationData['id'], height: number) => void
}

const NOTIFICATIONS_GAP = 16

const NotificationPositionImpl = (props: Props) => {
  console.log('[POSITION] RERENDER')

  const {
    id,
    index: heightIndex,
    children,
    notificationHeightBefore,
    x,
    y,
    onAddHeights,
    onChangeHeight,
    onRemoveHeights,
  } = props

  const notificationRef = useRef<HTMLLIElement>(null)
  const isMounted = useIsMounted()

  const offset = useRef(0)
  offset.current = useMemo(
    () => heightIndex * NOTIFICATIONS_GAP + notificationHeightBefore,
    [heightIndex, notificationHeightBefore],
  )

  useLayoutEffect(() => {
    const toastNode = notificationRef.current
    if (!isMounted() || !toastNode) return

    const originalHeight = toastNode.style.height
    toastNode.style.height = 'auto'
    const newHeight = toastNode.getBoundingClientRect().height
    toastNode.style.height = originalHeight

    onChangeHeight(id, newHeight)
  }, [id, isMounted, onChangeHeight])

  useEffect(() => {
    const toastNode = notificationRef.current
    if (!toastNode) return

    const height = toastNode.getBoundingClientRect().height

    onAddHeights(id, height)

    return () => onRemoveHeights(id)
  }, [id, onAddHeights, onRemoveHeights])

  return (
    <li
      ref={notificationRef}
      className={`notification-position`}
      data-position-y={y}
      data-position-x={x}
      style={
        {
          '--index': heightIndex,
          '--toasts-before': heightIndex,
          '--offset': `${offset.current}px`,
        } as CSSProperties
      }
    >
      {children}
    </li>
  )
}

export const NotificationPosition = memo(NotificationPositionImpl)
