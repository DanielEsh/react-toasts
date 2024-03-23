import type { NotificationHeightItem, NotificationData } from '../types.ts'
import { useQueue } from '@/use-queue.ts'
import { useState, useEffect, useCallback } from 'react'
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
    return observer.subscribe((payload) => {
      console.log('SUB', payload)

      const notification = payload

      if (payload.action === 'create') {
        ReactDOM.flushSync(() => {
          add(payload.data)

          if (payload?.data?.onCreate) {
            payload.data.onCreate(payload.data)
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
  }, [])

  const renderNotification = (notification: NotificationData) => {
    return notification.render ? (
      notification.render(notification, removeToast)
    ) : (
      <NotificationItem
        notification={notification}
        onDismiss={handleDismiss}
      />
    )
  }

  const [y, x] = position!.split('-')

  const classes = classNames(notificationGroupVariants({ position }))

  const addHeight = useCallback(
    (id: NotificationData['id'], height: number) => {
      setHeights((heights) => [...heights, { toastId: id, height }])
    },
    [],
  )

  const changeHeight = useCallback(
    (id: NotificationData['id'], newHeight: number) => {
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
    },
    [],
  )

  const removeHeight = useCallback((id: NotificationData['id']) => {
    setHeights((h) => h.filter((height) => height.toastId !== id))
  }, [])

  const notificationHeightBefore = useCallback(
    (heightIndex: number) => {
      return heights.reduce((prev, curr, reducerIndex) => {
        // Calculate offset up until current  toast
        if (reducerIndex >= heightIndex) {
          return prev
        }

        return prev + curr.height
      }, 0)
    },
    [heights],
  )

  return (
    <ol className={classes}>
      <AnimatePresence>
        {queue.length >= 1 && (
          <QueueIndicator
            count={queue.length}
            heights={heights}
            x={x}
            y={y}
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
            notificationHeightBefore={notificationHeightBefore(index)}
            onAddHeights={addHeight}
            onChangeHeight={changeHeight}
            onRemoveHeights={removeHeight}
          >
            {renderNotification(toast)}
          </NotificationPosition>
        ))}
      </AnimatePresence>
    </ol>
  )
}
