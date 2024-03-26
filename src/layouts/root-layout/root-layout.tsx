import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import type { NotificationsContainerPosition } from '@/modules/core/notification'
import { ExampleSection } from '@/pages/home-page/ui/example-section.tsx'

import { NotificationPositionChanger } from './ui/notification-position-changer.tsx'
import { RootHeader } from './ui/root-header.tsx'
import { RootNotifications } from './ui/root-notifications.tsx'

export const RootLayout = () => {
  const [basePosition, setBasePosition] =
    useState<NotificationsContainerPosition>('bottom-right')

  const { t } = useTranslation()

  const handlePositionChange = (position: NotificationsContainerPosition) => {
    if (basePosition === position) return
    setBasePosition(position)
  }

  return (
    <div>
      <RootHeader />

      <div className="container">
        <ExampleSection title={t('position')}>
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
