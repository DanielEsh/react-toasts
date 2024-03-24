import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import type { NotificationsContainerPosition } from '@/modules/core/notification'
import { RootHeader } from './ui/root-header.tsx'
import { RootNotifications } from './ui/root-notifications.tsx'
import { ExampleSection } from '@/routes/notifications-page/ui/example-section.tsx'
import { Button } from '@/shared/ui'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

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
            {positions.map((position) => (
              <Button
                data-active={basePosition === position}
                className="button"
                onClick={() => handlePositionChange(position)}
                key={position}
              >
                {position}
              </Button>
            ))}
          </div>
        </ExampleSection>

        <Outlet />
      </div>

      <RootNotifications basePosition={basePosition} />
    </div>
  )
}
