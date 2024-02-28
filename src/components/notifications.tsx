import type {
  ToastContainerPosition,
  NotificationHeightItem,
  NotificationType,
} from '../types.ts'
import { useQueue } from '../use-queue.ts'
import { useState, useEffect } from 'react'
import { NotificationObserver } from '../state.ts'
import ReactDOM from 'react-dom'
import { Notification } from './notification.tsx'
import { QueueIndicator } from './queue-indicator.tsx'
import { NotificationItem } from './notification-item.tsx'
import { AnimatePresence } from 'framer-motion'

interface Props {
  position: ToastContainerPosition
  limit?: number
}

const DEFAULT_LIMIT = 5

export const Notifications = ({ position, limit }: Props) => {
  const { state, queue, add, update } = useQueue<NotificationType>({
    limit: limit ?? DEFAULT_LIMIT,
  })
  const [heights, setHeights] = useState<NotificationHeightItem[]>([])

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

      if (notification.action === 'create') {
        ReactDOM.flushSync(() => {
          add(notification.data)
        })
      }

      if (notification.action === 'update') {
        update((state) => {
          return state.map((item) => {
            if (item.id === notification.id) {
              return {
                ...notification.data,
                id: item.id,
              }
            }

            return item
          })
        })
      }
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
        <AnimatePresence>
          {queue.length >= 1 && (
            <QueueIndicator
              count={queue.length}
              heights={heights}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.map((toast, index) => (
            <Notification
              key={toast.id}
              id={toast.id}
              index={index}
              allNotificationsCount={state.length}
              heights={heights}
              onChangeHeight={(newHeight) =>
                handleChangeHeight(newHeight, toast.id)
              }
              onAddHeights={(newHeight) =>
                handleAddHeightById(newHeight, toast.id)
              }
              onRemoveHeights={() => handleRemoveHeightById(toast.id)}
            >
              <NotificationItem
                type={toast.type}
                title={toast.title}
                description={toast.description}
                duration={toast.duration}
                onDismiss={() => removeToast(toast)}
              />
            </Notification>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  )
}
