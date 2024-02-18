import type { NotificationHeightItem } from '../types.ts'
import React, { CSSProperties, useEffect, useMemo, useState } from 'react'

interface Props {
  count: number
  heights: NotificationHeightItem[]
}

export const QueueIndicator = (props: Props) => {
  const { count, heights } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => {
      setTimeout(() => {
        setMounted(false)
      }, 0)
    }
  }, [])

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
    <div
      className="toast-queue"
      data-mounted={mounted}
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
