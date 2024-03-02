import { Button } from '../shared/ui'
import {
  createNotificationWithDescription,
  createNotificationWithType,
  simpleNotifications,
} from '../notification-helpers.ts'
import {
  promiseNotification,
  toastFunction,
  updateNotification,
} from '../state.ts'
import { NotificationType } from '../types.ts'

export const NotificationsPage = () => {
  const showUpdatedNotification = () => {
    toastFunction({
      id: 'for-updated',
      title: 'Simple notification',
      description: 'Loading...',
      type: 'loading',
    })
  }

  const handleUpdate = () => {
    updateNotification('for-updated', {
      id: 'for-updated',
      type: 'warning',
      title: 'Updated on warning',
      description: 'description',
      duration: 5,
    })
  }

  const handlePromiseSuccess = () => {
    const promise = () =>
      new Promise<NotificationType>((resolve) =>
        setTimeout(
          () => resolve({ title: 'test', type: 'success', duration: 5 }),
          2000,
        ),
      )

    promiseNotification(promise())
  }

  const handlePromiseError = () => {
    const promise = () =>
      new Promise<NotificationType>((_, reject) =>
        setTimeout(
          () =>
            reject({
              type: 'update-promise',
              title: 'test',
              type: 'error',
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
        <Button onClick={() => createNotificationWithType('success')}>
          Success notification
        </Button>

        <Button onClick={() => createNotificationWithType('info')}>
          Info notification
        </Button>

        <Button onClick={() => createNotificationWithType('warning')}>
          Warning notification
        </Button>

        <Button onClick={() => createNotificationWithType('error')}>
          Error notification
        </Button>
      </div>
    </div>
  )
}
