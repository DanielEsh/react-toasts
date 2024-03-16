import type { ReactNode } from 'react'
import { Button } from '@/shared/ui'
import { memo, useEffect, useLayoutEffect, useRef } from 'react'
import { CloseButton } from '@/shared/ui/button/close-button.tsx'
import type { MockNotificationItemType } from '@/routes/sandbox-page/ui/list/data.ts'

interface Props {
  children: ReactNode
  notification: MockNotificationItemType
  onClick: () => void
  notificationHeightBefore: number
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
  onClick,
  onAddHeights,
  onChangeHeight,
  onRemoveHeights,
  onClose,
}: Props) => {
  const notificationRef = useRef<HTMLLIElement>(null)

  console.log('list-item render')

  useLayoutEffect(() => {
    const toastNode = notificationRef.current
    if (!toastNode) return

    const originalHeight = toastNode.style.height
    toastNode.style.height = 'auto'
    const newHeight = toastNode.getBoundingClientRect().height
    toastNode.style.height = originalHeight

    console.log('CHANGE', newHeight)
    onChangeHeight(newHeight, notification.id)
  }, [notification.id])

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
  }, [notification.id])

  return (
    <li
      ref={notificationRef}
      className="relative flex w-[560px] bg-blue-500"
    >
      <div className="mr-5">
        notificationHeightBefore: {notificationHeightBefore}
      </div>
      <span>{children}</span>

      <Button
        variant="ghost"
        onClick={onClick}
      >
        Click me
      </Button>

      <CloseButton onClose={() => onClose(notification.id)} />
    </li>
  )
}

export const ListItem = memo(ListItemImpl)
