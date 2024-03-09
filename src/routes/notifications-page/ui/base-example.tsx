import { createNotification } from '@/notification'
import { Button } from '@/shared/ui'
import { getUid } from '@/shared/utils'

const makeBaseNotificationInfinity = () => {
  createNotification({
    id: getUid(),
    title: 'Simple notification',
  })
}

const makeBaseNotification = () => {
  createNotification({
    id: getUid(),
    title: 'Simple notification',
    duration: 5,
  })
}

const makeBaseNotificationWithDescription = () => {
  createNotification({
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
          onClick={makeBaseNotificationInfinity}
        >
          Simple notification (infinity)
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
