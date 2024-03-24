import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Section } from '../../components/Section.tsx'
import type { NotificationsContainerPosition } from '@/notification'
import { RootHeader } from './ui/root-header.tsx'
import { RootNotifications } from './ui/root-notifications.tsx'

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

      <div className="p-4">
        <Section
          title="Positions"
          description="description"
        >
          {positions.map((position) => (
            <button
              data-active={basePosition === position}
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

      <RootNotifications basePosition={basePosition} />
    </div>
  )
}
