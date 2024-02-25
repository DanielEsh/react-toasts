import { Outlet } from 'react-router-dom'
// import { Toasts } from '../components/toasts.tsx'
import { useState } from 'react'
import { Section } from '../components/Section.tsx'
import { ToastContainerPosition } from '../types.ts'
import { Notifications } from '../components/notifications.tsx'
import { Header } from './header.tsx'

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
    useState<ToastContainerPosition>('bottom-right')

  const handlePositionChange = (position: ToastContainerPosition) => {
    if (activePosition === position) return
    setActivePosition(position)
  }

  return (
    <div>
      RootLayout
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
      <Notifications position={activePosition} />
    </div>
  )
}
