import { Outlet } from 'react-router-dom'
// import { Toasts } from '../components/toasts.tsx'
import { useState } from 'react'
import { Section } from '../components/Section.tsx'
import type { NotificationsContainerPosition } from '../notification'
import { NOTIFICATION_TYPE } from '../notification'
import { NotificationsGroup } from '../notification/ui/notifications-group.tsx'
import { Header } from './header.tsx'
import {
  NotificationGroupObserver,
  NotificationObserver,
} from '@/notification/state.ts'
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

const NotificationTopRightObserver = new NotificationGroupObserver()
const NotificationTopLeftObserver = new NotificationGroupObserver()
const NotificationTopCenterObserver = new NotificationGroupObserver()
const NotificationBottomCenterObserver = new NotificationGroupObserver()
const NotificationBottomLeftObserver = new NotificationGroupObserver()

const makeTopLeftNotification = () => {
  NotificationTopLeftObserver.create({
    id: getUid(),
    title: 'Simple top left notification',
    type: NOTIFICATION_TYPE.DEFAULT,
  })
}

const makeTopRightNotification = () => {
  NotificationTopRightObserver.create({
    id: getUid(),
    title: 'Simple top right notification',
    type: NOTIFICATION_TYPE.DEFAULT,
  })
}

const makeTopCenterNotification = () => {
  NotificationTopCenterObserver.create({
    id: getUid(),
    title: 'Simple top center notification',
    type: NOTIFICATION_TYPE.DEFAULT,
  })
}

const makeBottomLeftNotification = () => {
  NotificationBottomLeftObserver.create({
    id: getUid(),
    title: 'Simple bottom left notification',
    type: NOTIFICATION_TYPE.DEFAULT,
  })
}

const makeBottomCenterNotification = () => {
  NotificationBottomCenterObserver.create({
    id: getUid(),
    title: 'Simple bottom center notification',
    type: NOTIFICATION_TYPE.DEFAULT,
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

        <Button onClick={makeTopLeftNotification}>
          Create Top Left Notification
        </Button>

        <Button onClick={makeTopRightNotification}>
          Create Top Right Notification
        </Button>

        <Button onClick={makeTopCenterNotification}>
          Create Top Center Notification
        </Button>

        <Button onClick={makeBottomLeftNotification}>
          Create Bottom Left Notification
        </Button>

        <Button onClick={makeBottomCenterNotification}>
          Create Bottom Center Notification
        </Button>

        <Outlet />
      </div>
      {/*<Toasts position={activePosition} />*/}
      <NotificationsGroup
        position={activePosition}
        observer={NotificationObserver}
      />

      <NotificationsGroup
        position="bottom-left"
        observer={NotificationBottomLeftObserver}
      />

      <NotificationsGroup
        position="bottom-center"
        observer={NotificationBottomCenterObserver}
      />

      <NotificationsGroup
        position="top-left"
        observer={NotificationTopLeftObserver}
      />
      <NotificationsGroup
        position="top-center"
        observer={NotificationTopCenterObserver}
      />
      <NotificationsGroup
        position="top-right"
        observer={NotificationTopRightObserver}
      />
    </div>
  )
}
