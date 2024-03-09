import { Outlet } from 'react-router-dom'
// import { Toasts } from '../components/toasts.tsx'
import { useState } from 'react'
import { Section } from '../components/Section.tsx'
import type { NotificationsContainerPosition } from '../notification'
import { Notifications } from '../notification/ui/notifications.tsx'
import { Header } from './header.tsx'
import { NotificationObserver } from '@/notification/state.ts'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

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
        <Outlet />
      </div>
      {/*<Toasts position={activePosition} />*/}
      <Notifications
        position={activePosition}
        observer={NotificationObserver}
      />
    </div>
  )
}
