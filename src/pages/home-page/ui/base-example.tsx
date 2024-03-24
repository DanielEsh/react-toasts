import { Notification } from '@/modules/core/notification'
import { Button } from '@/shared/ui'
import { getUid } from '@/shared/utils'

const makeBaseNotificationInfinityUid = () => {
  Notification.create({
    id: getUid(),
    title: 'Simple notification',
    onCreate: (notification) => {
      console.log(`Notification with ID:${notification?.id} CREATED`)
    },
    onDismiss: (notification) => {
      console.log(`Notification with ID:${notification?.id} DISMISSED`)
    },
  })
}

const ID = 'SimpleID'

const makeBaseNotificationInfinity = () => {}

const hDismiss = () => {
  Notification.dismiss(ID)
}

const makeBaseNotification = () => {
  Notification.create({
    id: getUid(),
    title: 'Simple notification',
    duration: 5,
  })
}

const makeBaseNotificationWithDescription = () => {
  Notification.create({
    id: getUid(),
    title: 'Simple notification',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    duration: 5,
  })
}

export const BaseExample = () => {
  return (
    <div className="my-6">
      <h2 className="mb-6 text-2xl">Base</h2>

      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={makeBaseNotificationInfinityUid}
        >
          Simple notification (infinity) (uniq id)
        </Button>

        <Button
          size="lg"
          onClick={makeBaseNotificationInfinity}
        >
          Simple notification (infinity) (const id)
        </Button>

        <Button
          size="lg"
          onClick={hDismiss}
        >
          Dismiss
        </Button>

        <Button
          size="lg"
          onClick={makeBaseNotification}
        >
          Simple notification (with timer)
        </Button>

        <Button
          size="lg"
          onClick={makeBaseNotificationWithDescription}
        >
          Notification with description
        </Button>
      </div>
    </div>
  )
}
