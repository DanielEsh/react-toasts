import { BaseButton } from '../shared/ui'
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
          () => reject({ title: 'test', type: 'error', duration: 5 }),
          2000,
        ),
      )

    promiseNotification(promise())
  }

  return (
    <div>
      <span>NotificationsPage</span>

      <h2>Updated</h2>
      <div className="flex gap-3">
        <BaseButton onClick={showUpdatedNotification}>Create</BaseButton>

        <BaseButton onClick={handleUpdate}>Update</BaseButton>

        <BaseButton onClick={handlePromiseSuccess}>Promise success</BaseButton>
        <BaseButton onClick={handlePromiseError}>Promise error</BaseButton>
      </div>

      <div className="flex gap-3">
        <BaseButton onClick={simpleNotifications}>
          Simple notification
        </BaseButton>

        <BaseButton onClick={createNotificationWithDescription}>
          Notification with description
        </BaseButton>
      </div>

      <div className="flex gap-3">
        <BaseButton onClick={() => createNotificationWithType('success')}>
          Success notification
        </BaseButton>

        <BaseButton onClick={() => createNotificationWithType('info')}>
          Info notification
        </BaseButton>

        <BaseButton onClick={() => createNotificationWithType('warning')}>
          Warning notification
        </BaseButton>

        <BaseButton onClick={() => createNotificationWithType('error')}>
          Error notification
        </BaseButton>
      </div>
    </div>
  )
}
