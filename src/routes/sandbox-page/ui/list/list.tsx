import {
  notificationList,
  type MockNotificationItemType,
} from '@/routes/sandbox-page/ui/list/data.ts'
import { ListItem } from '@/routes/sandbox-page/ui/list/list-item.tsx'
import { useCallback, useState } from 'react'
import { ListForm } from '@/routes/sandbox-page/ui/list/list-form.tsx'

interface NotificationHeightItem {
  id: number
  height: number
}

let ID = 101

export const List = () => {
  const [state, setState] =
    useState<MockNotificationItemType[]>(notificationList)
  const [heights, setHeights] = useState<NotificationHeightItem[]>([])

  console.log('LIST RERENDER', heights)

  const handleClick = useCallback(() => {
    console.log('CLICK')
  }, [])

  const handleSubmit = (value: string) => {
    const newNotification: MockNotificationItemType = {
      id: ID,
      title: value,
    }

    setState((prevState) => {
      return [newNotification, ...prevState]
    })

    ID += 1
  }

  const addHeightById = useCallback(
    (height: number, id: MockNotificationItemType['id']) => {
      setHeights((heights) => [...heights, { id: id, height }])
    },
    [],
  )

  const handleClose = useCallback(
    (removedId: MockNotificationItemType['id']) => {
      setState((prevState) => {
        return prevState.filter((item) => item.id !== removedId)
      })
    },
    [],
  )

  const changeHeight = useCallback(
    (newHeight: number, id: MockNotificationItemType['id']) => {
      setHeights((heights) => {
        const alreadyExists = heights.find((height) => height.id === id)
        if (!alreadyExists) {
          return [...heights, { id: id, height: newHeight }]
        } else {
          return heights.map((height) =>
            height.id === id ? { ...height, height: newHeight } : height,
          )
        }
      })
    },
    [],
  )

  const removeHeightById = useCallback((id: MockNotificationItemType['id']) => {
    console.log('removeHeightById', id)
    setHeights((h) => h.filter((height) => height.id !== id))
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
    <div>
      <ListForm onSubmit={handleSubmit} />

      <div className="flex flex-col gap-3">
        {state.map((notification, index) => {
          return (
            <ListItem
              key={notification.id}
              notification={notification}
              notificationHeightBefore={notificationHeightBefore(index)}
              onAddHeights={addHeightById}
              onChangeHeight={changeHeight}
              onRemoveHeights={removeHeightById}
              onClick={handleClick}
              onClose={handleClose}
            >
              {notification.title}
            </ListItem>
          )
        })}
      </div>
    </div>
  )
}
