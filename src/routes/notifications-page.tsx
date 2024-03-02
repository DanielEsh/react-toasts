import { Button } from '../shared/ui'
import {
  createNotificationWithDescription,
  createNotificationWithType,
  simpleNotifications,
} from '../notification-helpers.ts'
import {
  createNotification,
  NOTIFICATION_TYPE,
  type NotificationData,
  promiseNotification,
  updateNotification,
} from '../notification'

export const NotificationsPage = () => {
  const showUpdatedNotification = () => {
    createNotification({
      id: 'for-updated',
      title: 'Simple notification',
      description: 'Loading...',
      type: NOTIFICATION_TYPE.LOADING,
    })
  }

  const handleUpdate = () => {
    updateNotification('for-updated', {
      id: 'for-updated',
      type: NOTIFICATION_TYPE.WARNING,
      title: 'Updated on warning',
      description: 'description',
      duration: 5,
    })
  }

  const handlePromiseSuccess = () => {
    const promise = () =>
      new Promise<NotificationData>((resolve) =>
        setTimeout(
          () =>
            resolve({
              id: 'new-id',
              title: 'test',
              type: NOTIFICATION_TYPE.SUCCESS,
              duration: 5,
            }),
          2000,
        ),
      )

    promiseNotification(promise())
  }

  const handlePromiseError = () => {
    const promise = () =>
      new Promise<NotificationData>((_, reject) =>
        setTimeout(
          () =>
            reject({
              id: 'update-promise',
              title: 'test',
              type: NOTIFICATION_TYPE.ERROR,
              duration: 5,
            }),
          2000,
        ),
      )

    promiseNotification(promise())
  }

  return (
    <div>
      <span>NotificationsPage</span>

      <div className="w-[800px] h-[200px] flex items-center justify-center border border-amber-400 bg-lime-400 dark:bg-red-500">
        CONTAINER
      </div>

      <h2>Updated</h2>
      <div className="flex gap-3">
        <Button onClick={showUpdatedNotification}>Create</Button>

        <Button onClick={handleUpdate}>Update</Button>

        <Button onClick={handlePromiseSuccess}>Promise success</Button>
        <Button onClick={handlePromiseError}>Promise error</Button>
      </div>

      <div className="flex gap-3">
        <Button onClick={simpleNotifications}>Simple notification</Button>

        <Button onClick={createNotificationWithDescription}>
          Notification with description
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => createNotificationWithType(NOTIFICATION_TYPE.SUCCESS)}
        >
          Success notification
        </Button>

        <Button
          onClick={() => createNotificationWithType(NOTIFICATION_TYPE.INFO)}
        >
          Info notification
        </Button>

        <Button
          onClick={() => createNotificationWithType(NOTIFICATION_TYPE.WARNING)}
        >
          Warning notification
        </Button>

        <Button
          onClick={() => createNotificationWithType(NOTIFICATION_TYPE.ERROR)}
        >
          Error notification
        </Button>
      </div>
    </div>
  )
}
