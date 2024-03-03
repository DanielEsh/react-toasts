import { Button } from '@/shared/ui'
import { createNotification, NOTIFICATION_TYPE } from '@/notification'
import { getUid } from '@/shared/utils'

const titlesMap: Record<NOTIFICATION_TYPE, string> = {
  default: 'Default Notification',
  success: 'Success Notification',
  info: 'Info Notification',
  warning: 'Warning Notification',
  error: 'Error Notification',
  loading: 'Loading Notification',
}

const descriptionMap: Record<NOTIFICATION_TYPE, string> = {
  default: 'Simple notification with description and default style.',
  success: 'Success notification with description and default style.',
  info: 'Info notification with description and default style.',
  warning: 'Warning notification with description and default style.',
  error: 'Error notification with description and default style.',
  loading: 'Loading...',
}

const handleMakeNotification = (type: NOTIFICATION_TYPE) => {
  createNotification({
    id: getUid(),
    title: titlesMap[type],
    description: descriptionMap[type],
    type,
    duration: 5,
  })
}

export const TypesExample = () => {
  return (
    <div className="my-6">
      <h2 className="mb-6 text-2xl">Types</h2>

      <div className="flex gap-3 ">
        <Button
          size="lg"
          onClick={() => handleMakeNotification(NOTIFICATION_TYPE.DEFAULT)}
        >
          Default
        </Button>

        <Button
          size="lg"
          onClick={() => handleMakeNotification(NOTIFICATION_TYPE.SUCCESS)}
        >
          Success
        </Button>

        <Button
          size="lg"
          onClick={() => handleMakeNotification(NOTIFICATION_TYPE.INFO)}
        >
          Info
        </Button>

        <Button
          size="lg"
          onClick={() => handleMakeNotification(NOTIFICATION_TYPE.WARNING)}
        >
          Warning
        </Button>

        <Button
          size="lg"
          onClick={() => handleMakeNotification(NOTIFICATION_TYPE.ERROR)}
        >
          Error
        </Button>

        <Button
          size="lg"
          onClick={() => handleMakeNotification(NOTIFICATION_TYPE.LOADING)}
        >
          Loading
        </Button>
      </div>
    </div>
  )
}
