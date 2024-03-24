import {
  NotificationsGroup,
  NotificationGroupObserver,
  type NotificationsContainerPosition,
  Notification,
} from '@/modules/core/notification'

const NotificationTopRightObserver = new NotificationGroupObserver()
const NotificationTopLeftObserver = new NotificationGroupObserver()
const NotificationTopCenterObserver = new NotificationGroupObserver()
const NotificationBottomCenterObserver = new NotificationGroupObserver()
const NotificationBottomLeftObserver = new NotificationGroupObserver()

interface Props {
  basePosition: NotificationsContainerPosition
}

export const RootNotifications = ({ basePosition }: Props) => {
  return (
    <>
      <NotificationsGroup
        position={basePosition}
        observer={Notification}
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
    </>
  )
}
