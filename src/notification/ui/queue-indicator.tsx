import type { NotificationHeightItem } from '../types.ts'
import React, { CSSProperties, useMemo } from 'react'
import { SlideDown } from '../../components/framer/slide-down.tsx'

interface Props {
  count: number
  heights: NotificationHeightItem[]
}

export const QueueIndicator = (props: Props) => {
  const { count, heights } = props

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
    <SlideDown>
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
    </SlideDown>
  )
}
