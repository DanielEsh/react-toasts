import { NotificationPositionChangerButton } from '@/layouts/root-layout/ui/notification-position-changer-button.tsx'
import type { NotificationsContainerPosition } from '@/modules/core/notification'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const

interface Props {
  basePosition: NotificationsContainerPosition
  onPositionChange: (position: NotificationsContainerPosition) => void
}

export const NotificationPositionChanger = ({
  basePosition,
  onPositionChange,
}: Props) => {
  return (
    <div className="flex gap-3">
      {positions.map((position, index) => (
        <NotificationPositionChangerButton
          key={index}
          position={position}
          active={basePosition === position}
          onClick={() => onPositionChange(position)}
        />
      ))}
    </div>
  )
}
