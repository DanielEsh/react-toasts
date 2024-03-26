import type { NotificationsContainerPosition } from '@/modules/core/notification'
import { Button } from '@/shared/ui'
import { classNames } from '@/shared/utils'

interface Props {
  active: boolean
  position: NotificationsContainerPosition
  onClick: () => void
}

export const NotificationPositionChangerButton = ({
  active,
  position,
  onClick,
}: Props) => {
  const classes = classNames({
    'bg-gray-200': active,
  })

  return (
    <Button
      className={classes}
      onClick={onClick}
    >
      {position}
    </Button>
  )
}
