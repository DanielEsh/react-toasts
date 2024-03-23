import type { NotificationHeightItem } from '../types.ts'
import React, { type CSSProperties, useMemo } from 'react'
import { FadeTransition } from '@/shared/ui'

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

  return (
    <FadeTransition>
      <div
        className="toast-queue right-0 w-notification"
        data-position-y={y}
        data-position-x={x}
        style={
          {
            '--offset': `${offset.current}px`,
          } as CSSProperties
        }
      >
        <span>уведомлений в очереди: {count}</span>
      </div>
    </FadeTransition>
  )
}
