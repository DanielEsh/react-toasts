import type {
  ToastContainerPosition,
  NotificationHeightItem,
  NotificationType,
} from '../types.ts'
import { useQueue } from '../use-queue.ts'
import React, { useEffect } from 'react'
import { NotificationObserver } from '../state.ts'
import ReactDOM from 'react-dom'
import { Notification } from './notification.tsx'

interface Props {
  position: ToastContainerPosition
}

export const Notifications = ({ position }: Props) => {
  const { state, add, update } = useQueue<NotificationType>({
    limit: 5,
  })
  const [heights, setHeights] = React.useState<NotificationHeightItem[]>([])

  const removeToast = (toast: NotificationType) => {
    update((notifications) =>
      notifications.filter((notification) => {
        return notification.id !== toast.id
      }),
    )
    setHeights((h) => h.filter((height) => height.toastId !== toast.id))
  }

  useEffect(() => {
    return NotificationObserver.subscribe((notification) => {
      console.log('SUB', notification)

      ReactDOM.flushSync(() => {
        add(notification)
      })
    })
  }, [])

  const handleAddHeightById = (height: number, id: NotificationType['id']) => {
    setHeights((heights) => [...heights, { toastId: id, height }])
  }

  const handleChangeHeight = (
    newHeight: number,
    id?: NotificationType['id'],
  ) => {
    setHeights((heights) => {
      const alreadyExists = heights.find((height) => height.toastId === id)
      if (!alreadyExists) {
        return [...heights, { toastId: id, height: newHeight }]
      } else {
        return heights.map((height) =>
          height.toastId === id ? { ...height, height: newHeight } : height,
        )
      }
    })
  }

  const handleRemoveHeightById = (id: NotificationType['id']) => {
    setHeights((h) => h.filter((height) => height.toastId !== id))
  }

  return (
    <section className="toasts-section">
      <ol className={`toasts position-${position}`}>
        {state.map((toast, index) => (
          <Notification
            key={toast.id}
            id={toast.id}
            index={index}
            allNotificationsCount={state.length}
            duration={toast.duration}
            type={toast.type}
            title={toast.title}
            description={toast.description}
            heights={heights}
            onChangeHeight={(newHeight) =>
              handleChangeHeight(newHeight, toast.id)
            }
            onAddHeights={(newHeight) =>
              handleAddHeightById(newHeight, toast.id)
            }
            onRemoveHeights={() => handleRemoveHeightById(toast.id)}
            onDismiss={() => removeToast(toast)}
          />
        ))}
      </ol>
    </section>
  )
}
