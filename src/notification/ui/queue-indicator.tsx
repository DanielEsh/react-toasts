import type { NotificationHeightItem } from '../types.ts'
import { NOTIFICATION_TYPE } from '../types.ts'
import React, { type CSSProperties, useMemo } from 'react'
import { FadeTransition } from '@/shared/ui'
import { NotificationItem } from '@/notification/ui/notification-item.tsx'

interface Props {
  count: number
  x: string
  y: string
  heights: NotificationHeightItem[]
}

export const QueueIndicator = (props: Props) => {
  const { count, heights, x, y } = props

  const heightIndex = heights.length

  const notificationHeightBefore = useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev
      }

      return prev + curr.height
    }, 0)
  }, [heights])

  const offset = React.useRef(0)
  offset.current = React.useMemo(
    () => heightIndex * 16 + notificationHeightBefore,
    [heightIndex, notificationHeightBefore],
  )

  const handleDismiss = () => {}

  return (
    <FadeTransition>
      <div
        className="toast-queue"
        data-position-y={y}
        data-position-x={x}
        style={
          {
            '--offset': `${offset.current}px`,
          } as CSSProperties
        }
      >
        <div className="flex flex-col items-center justify-center">
          <span className="w-notification bg-blue-500">
            уведомлений в очереди: {count}
          </span>
        </div>
      </div>
    </FadeTransition>
  )
}
