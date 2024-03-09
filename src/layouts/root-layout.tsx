import { Outlet } from 'react-router-dom'
// import { Toasts } from '../components/toasts.tsx'
import { useState } from 'react'
import { Section } from '../components/Section.tsx'
import type { NotificationsContainerPosition } from '../notification'
import { NOTIFICATION_TYPE } from '../notification'
import { Notifications } from '../notification/ui/notifications.tsx'
import { Header } from './header.tsx'
import { NotificationObserver, Observer } from '@/notification/state.ts'
import { Button } from '@/shared/ui'
import { getUid } from '@/shared/utils'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

const NotificationTopRightObserver = new Observer()

const makeBaseNotification = () => {
  NotificationTopRightObserver.create({
    id: getUid(),
    title: 'Simple notification',
    type: NOTIFICATION_TYPE.DEFAULT,
    duration: 5,
  })
}

export const RootLayout = () => {
  const [activePosition, setActivePosition] =
    useState<NotificationsContainerPosition>('bottom-right')

  const handlePositionChange = (position: NotificationsContainerPosition) => {
    if (activePosition === position) return
    setActivePosition(position)
  }

  return (
    <div>
      <Header />
      <div className="p-4">
        <Section
          title="Positions"
          description="description"
        >
          {positions.map((position) => (
            <button
              data-active={activePosition === position}
              className="button"
              onClick={() => handlePositionChange(position)}
              key={position}
            >
              {position}
            </button>
          ))}
        </Section>
        <Button onClick={makeBaseNotification}>
          Create Top Right Notification
        </Button>
        <Outlet />
      </div>
      {/*<Toasts position={activePosition} />*/}
      <Notifications
        position={activePosition}
        observer={NotificationObserver}
      />
      <Notifications
        position="top-right"
        observer={NotificationTopRightObserver}
      />
    </div>
  )
}
