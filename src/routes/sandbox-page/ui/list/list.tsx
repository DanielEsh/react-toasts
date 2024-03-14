import {
  notificationList,
  type MockNotificationItemType,
} from '@/routes/sandbox-page/ui/list/data.ts'
import { ListItem } from '@/routes/sandbox-page/ui/list/list-item.tsx'
import { useCallback, useState } from 'react'
import { ListForm } from '@/routes/sandbox-page/ui/list/list-form.tsx'

let ID = 101

export const List = () => {
  const [state, setState] =
    useState<MockNotificationItemType[]>(notificationList)

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

  return (
    <div>
      <ListForm onSubmit={handleSubmit} />

      <div className="flex flex-col gap-3">
        {state.map((notification) => {
          return (
            <ListItem
              key={notification.id}
              onClick={handleClick}
            >
              {notification.title}
            </ListItem>
          )
        })}
      </div>
    </div>
  )
}
