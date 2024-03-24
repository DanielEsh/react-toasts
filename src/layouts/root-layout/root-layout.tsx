import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import type { NotificationsContainerPosition } from '@/modules/core/notification'
import { RootHeader } from './ui/root-header.tsx'
import { RootNotifications } from './ui/root-notifications.tsx'
import { ExampleSection } from '@/routes/notifications-page/ui/example-section.tsx'
import { NotificationPositionChanger } from './ui/notification-position-changer.tsx'

export const RootLayout = () => {
  const [basePosition, setBasePosition] =
    useState<NotificationsContainerPosition>('bottom-right')

  const handlePositionChange = (position: NotificationsContainerPosition) => {
    if (basePosition === position) return
    setBasePosition(position)
  }

  return (
    <div>
      <RootHeader />

      <div className="container">
        <ExampleSection title="Positions">
          <div className="flex gap-3">
            <NotificationPositionChanger
              basePosition={basePosition}
              onPositionChange={handlePositionChange}
            />
          </div>
        </ExampleSection>

        <Outlet />
      </div>

      <RootNotifications basePosition={basePosition} />
    </div>
  )
}
