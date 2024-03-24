import type { ReactNode } from 'react'
import { Button } from '@/shared/ui'
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { CloseButton } from '@/shared/ui/button/close-button.tsx'
import type { MockNotificationItemType } from '@/pages/sandbox-page/ui/list/data.ts'
import { motion } from 'framer-motion'

const NOTIFICATIONS_GAP = 16

interface Props {
  children: ReactNode
  notification: MockNotificationItemType
  onClick: () => void
  notificationHeightBefore: number
  heightIndex: number
  onChangeHeight: (
    newHeight: number,
    id: MockNotificationItemType['id'],
  ) => void
  onAddHeights: (height: number, id: MockNotificationItemType['id']) => void
  onRemoveHeights: (id: MockNotificationItemType['id']) => void
  onClose: (id: MockNotificationItemType['id']) => void
}

const ListItemImpl = ({
  children,
  notification,
  notificationHeightBefore,
  heightIndex,
  onClick,
  onAddHeights,
  onChangeHeight,
  onRemoveHeights,
  onClose,
}: Props) => {
  const notificationRef = useRef<HTMLLIElement>(null)

  console.log('list-item render')

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

    console.log('CHANGE', newHeight)
    onChangeHeight(newHeight, notification.id)
  }, [notification.id, onChangeHeight])

  useEffect(() => {
    const toastNode = notificationRef.current
    if (!toastNode) return

    const height = toastNode.getBoundingClientRect().height

    console.log('ADD HEIGHT', height)
    onAddHeights(height, notification.id)

    return () => {
      console.log('REMOVE HEIGHT', height)
      onRemoveHeights(notification.id)
    }
  }, [notification.id, onAddHeights, onRemoveHeights])

  return (
    <motion.li
      ref={notificationRef}
      className="relative flex w-[560px] flex-col bg-blue-500"
      layout
      initial={{ opacity: 0, x: -400, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 1.2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mr-5">
        notificationHeightBefore: {notificationHeightBefore}
      </div>
      <div className="mr-5">OFFSET: {offset.current}</div>
      <span>{children}</span>

      <div>
        <Button
          variant="ghost"
          onClick={onClick}
        >
          Click me
        </Button>
      </div>

      <CloseButton onClose={() => onClose(notification.id)} />
    </motion.li>
  )
}

export const ListItem = memo(ListItemImpl)
