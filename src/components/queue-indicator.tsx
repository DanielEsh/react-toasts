import type { NotificationHeightItem } from '../types.ts'
import React, { CSSProperties, useMemo } from 'react'

interface Props {
  count: number
  heights: NotificationHeightItem[]
}

export const QueueIndicator = (props: Props) => {
  const { count, heights } = props
  console.log('HEIGHTS', heights)
  console.log('LAST', heights.at(-1))

  const heightIndex = heights.length + 1

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
    <div
      className="toast-queue"
      style={
        {
          '--offset': `${offset.current}px`,
        } as CSSProperties
      }
    >
      <span>уведомлений в очереди: {count}</span>
    </div>
  )
}
