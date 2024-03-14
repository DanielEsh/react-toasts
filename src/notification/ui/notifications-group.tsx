import type { NotificationHeightItem, NotificationData } from '../types.ts'
import { useQueue } from '@/use-queue.ts'
import { useState, useEffect, useMemo } from 'react'
import { type NotificationGroupObserver } from '../state.ts'
import ReactDOM from 'react-dom'
import { NotificationPosition } from './notification-position.tsx'
import { QueueIndicator } from './queue-indicator.tsx'
import { NotificationItem } from './notification-item.tsx'
import { AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { classNames } from '@/shared/utils'

const DEFAULT_LIMIT = 5

const notificationGroupVariants = cva(
  'notification-group fixed flex justify-end items-end',
  {
    variants: {
      position: {
        'top-left': 'top-8 left-8 flex justify-start items-start',
        'top-center': 'top-8 left-1/2 flex justify-center items-center',
        'top-right': 'top-8 right-8',
        'bottom-left': 'left-8 bottom-8 flex justify-start items-star',
        'bottom-center': 'bottom-8 left-1/2 flex justify-center items-center',
        'bottom-right': 'right-8 bottom-8 flex justify-end items-end',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  },
)

interface Props extends VariantProps<typeof notificationGroupVariants> {
  observer: NotificationGroupObserver
  limit?: number
}

export const NotificationsGroup = ({
  position = 'bottom-right',
  limit,
  observer,
}: Props) => {
  const { state, queue, add, update } = useQueue<NotificationData>({
    limit: limit ?? DEFAULT_LIMIT,
  })
  const [heights, setHeights] = useState<NotificationHeightItem[]>([])

  const removeToast = (notificationData: NotificationData) => {
    console.log('remove', notificationData)

    update((notifications) =>
      notifications.filter((notification) => {
        return notification.id !== notificationData.id
      }),
    )
    setHeights((h) =>
      h.filter((height) => height.toastId !== notificationData.id),
    )
  }

  const handleDismiss = (notificationData: NotificationData) => {
    removeToast(notificationData)
    if (notificationData.onDismiss) {
      notificationData.onDismiss(notificationData)
    }
  }

  useEffect(() => {
    return observer.subscribe((notification) => {
      console.log('SUB', notification)

      if (notification.action === 'create') {
        ReactDOM.flushSync(() => {
          add(notification.data)

          if (notification?.data?.onCreate) {
            notification.data.onCreate(notification.data)
          }
        })
      }

      if (notification.action === 'update') {
        update((state) => {
          return state.map((item) => {
            if (item.id === notification.id) {
              if (notification?.data?.onUpdate) {
                notification.data.onUpdate({
                  id: item.id,
                  ...notification.data,
                })
              }

              return {
                id: item.id,
                ...notification.data,
              }
            }

            return item
          })
        })
      }

      if (notification.action === 'dismiss') {
        const removed = state.find((item) => item.id === notification.id)
        if (!removed) return
        handleDismiss(removed)
      }
    })
  }, [state, add, update])

  const handleAddHeightById = (height: number, id: NotificationData['id']) => {
    setHeights((heights) => [...heights, { toastId: id, height }])
  }

  const handleChangeHeight = (
    newHeight: number,
    id: NotificationData['id'],
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

  const handleRemoveHeightById = (id: NotificationData['id']) => {
    console.log('handleRemoveHeightById', id)
    setHeights((h) => h.filter((height) => height.toastId !== id))
  }

  const renderNotification = (notification: NotificationData) => {
    return notification.render ? (
      notification.render(notification, () => removeToast(notification))
    ) : (
      <NotificationItem
        type={notification.type}
        title={notification.title}
        description={notification.description}
        duration={notification.duration}
        onDismiss={() => handleDismiss(notification)}
      />
    )
  }

  const notificationHeightBefore = (heightIndex: number) => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev
      }

      return prev + curr.height
    }, 0)
  }

  const [y, x] = position!.split('-')

  const classes = classNames(notificationGroupVariants({ position }))

  return (
    <ol className={classes}>
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
          <NotificationPosition
            key={`${toast.id}${toast.type}`}
            id={toast.id}
            x={x}
            y={y}
            index={index}
            allNotificationsCount={state.length}
            notificationHeightBefore={notificationHeightBefore(index)}
            onChangeHeight={(newHeight) =>
              handleChangeHeight(newHeight, toast.id)
            }
            onAddHeights={(newHeight) =>
              handleAddHeightById(newHeight, toast.id)
            }
            onRemoveHeights={() => handleRemoveHeightById(toast.id)}
          >
            {renderNotification(toast)}
          </NotificationPosition>
        ))}
      </AnimatePresence>
    </ol>
  )
}