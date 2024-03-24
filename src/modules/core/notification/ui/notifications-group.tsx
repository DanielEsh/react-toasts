import { useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { classNames } from '@/shared/utils'
import { useQueue } from '@/shared/hooks/use-queue.ts'
import type { NotificationHeightItem, NotificationData } from '../types.ts'
import { type NotificationGroupObserver } from '../state.ts'
import { NotificationPosition } from './notification-position.tsx'
import { NotificationQueueIndicator } from './notification-queue-indicator.tsx'
import { NotificationItem } from './notification-item.tsx'
import { cva, type VariantProps } from 'class-variance-authority'

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
  limit = DEFAULT_LIMIT,
  observer,
}: Props) => {
  const { state, queue, add, update } = useQueue<NotificationData>({
    limit: limit,
  })
  const [heights, setHeights] = useState<NotificationHeightItem[]>([])

  const removeToast = useCallback(
    (notificationData: NotificationData) => {
      update((notifications) =>
        notifications.filter((notification) => {
          return notification.id !== notificationData.id
        }),
      )
      setHeights((h) =>
        h.filter((height) => height.notificationId !== notificationData.id),
      )
    },
    [update],
  )

  const handleDismiss = useCallback(
    (notificationData: NotificationData) => {
      removeToast(notificationData)
      if (notificationData.onDismiss) {
        notificationData.onDismiss(notificationData)
      }
    },
    [removeToast],
  )

  useEffect(() => {
    return observer.subscribe((payload) => {
      const notification = payload

      if (payload.action === 'create') {
        flushSync(() => {
          add(payload.data)

          if (payload.data?.onCreate) {
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
  }, [add, handleDismiss, observer, state, update])

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
      setHeights((heights) => [...heights, { notificationId: id, height }])
    },
    [],
  )

  const changeHeight = useCallback(
    (id: NotificationData['id'], newHeight: number) => {
      setHeights((heights) => {
        const alreadyExists = heights.find(
          (height) => height.notificationId === id,
        )
        if (!alreadyExists) {
          return [...heights, { notificationId: id, height: newHeight }]
        } else {
          return heights.map((height) =>
            height.notificationId === id
              ? { ...height, height: newHeight }
              : height,
          )
        }
      })
    },
    [],
  )

  const removeHeight = useCallback((id: NotificationData['id']) => {
    setHeights((h) => h.filter((height) => height.notificationId !== id))
  }, [])

  const notificationHeightBefore = useCallback(
    (heightIndex: number) => {
      return heights.reduce((prev, curr, reducerIndex) => {
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
          <NotificationPosition
            index={limit}
            x={x}
            y={y}
            notificationHeightBefore={notificationHeightBefore(limit)}
          >
            <NotificationQueueIndicator count={queue.length} />
          </NotificationPosition>
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
